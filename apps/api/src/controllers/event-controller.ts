import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import fs from "fs/promises";

import { EventRequestBody } from "../types/interfaces.js";

const prisma = new PrismaClient();

export async function getAllEvents(req: Request, res: Response) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = (+page - 1) * +limit;

    const allEvents = await prisma.event.findMany();

    const events = await prisma.event.findMany({
      skip: skip,
      take: +limit,
    });

    res
      .status(200)
      .json({ data: events, totalPages: Math.ceil(allEvents.length) / +limit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all articles data" });
  }
}

export async function getEventId(req: Request, res: Response) {
  try {
    const id = req.params.eventsId;
    const event = await prisma.event.findUnique({ where: { id: id } });
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: "Failed to get the event data" });
  }
}

export async function createEvent(req: Request, res: Response): Promise<void> {
  try {
    const {
      title,
      image,
      description,
      location,
      quota,
      type,
      tickets,
    }: EventRequestBody = req.body;
    const userId = req.user.id;

    if (type === "PAID") {
      await prisma.event.create({
        data: {
          title,
          image,
          description,
          location,
          quota,
          userId,
          Ticket: {
            create: tickets.map((ticket) => ({
              price: ticket.price,
              quantity: ticket.quantity,
              userTicketLimit: ticket.userTicketLimit,
              ticketCategory: ticket.ticketCategory || "REGULER", // Default to 'NORMAL' if not provided
            })),
          },
        },
      });
    } else {
      await prisma.event.create({
        data: { title, description, location, quota, userId },
      });
    }
    res.status(201).json({ message: "Event Created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create the Event" });
  }
}

export async function deleteAll(req: Request, res: Response) {
  try {
    await prisma.event.deleteMany();
    res.status(200).json({ message: `Successfully Deleted All ARTICLES` });
  } catch (error) {
    res.status(500);
  }
}
