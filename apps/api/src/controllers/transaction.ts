import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { MidtransClient } from "midtrans-node-client";
import { v7 as uuid } from "uuid";

const prisma = new PrismaClient();

const snap = new MidtransClient.Snap({
  isProduction: process.env.NODE_ENV === "production" ? true : false,
  serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY!,
});

export async function createTransaction(req: Request, res: Response) {
  try {
    const { ticketId, totalTicket, pointUsed } = req.body;
    const userId = req.user.id;

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { Event: true },
    });

    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" });
      return;
    }

    const ticketPrice = ticket.price;
    const totalPriceBeforeDiscount = ticketPrice * totalTicket;

    // Apply point discount
    let pointsToUse = 0;
    if (pointUsed && pointUsed > 0) {
      // Check if user has enough points
      const userPoints = await prisma.point.findMany({
        where: { userId, expiredAt: { gt: new Date() } },
      });
      const totalUserPoints = userPoints.reduce(
        (acc, point) => acc + point.amount,
        0
      );
      pointsToUse = Math.min(
        pointUsed,
        totalUserPoints,
        totalPriceBeforeDiscount
      );
      if (pointsToUse > 0) {
        // Deduct points (simplified: just deduct from all points)
        let remaining = pointsToUse;
        for (const p of userPoints) {
          if (remaining === 0) break;
          const deduct = Math.min(remaining, p.amount);
          await prisma.point.update({
            where: { id: p.id },
            data: { amount: p.amount - deduct },
          });
          remaining -= deduct;
        }
      }
    }

    const finalTotalPrice = totalPriceBeforeDiscount - pointsToUse;

    const orderId = uuid();

    await prisma.$transaction(async (tx) => {
      // Create the transaction
      await tx.transaction.create({
        data: {
          id: orderId,
          userId,
          ticketId,
          totalTicket,
          totalPrice: finalTotalPrice,
        },
      });

      // Update seat availability
      await tx.event.update({
        where: { id: ticket.eventId },
        data: { seat: { decrement: totalTicket } },
      });
    });

    // Create a Midtrans transaction
    const midtransTransaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: finalTotalPrice,
      },
      item_details: [
        {
          id: ticket.Event.id,
          name: ticket.Event.title,
          quantity: totalTicket,
          price: ticketPrice,
        },
      ],
      customer_details: {
        first_name: req.user.firstname,
        email: req.user.email,
      },
    });

    res.status(201).json({
      message: "Transaction created successfully",
      data: { midtransTransaction },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
}

export async function updateTransactionStatus(req: Request, res: Response) {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update transaction status" });
  }
}
