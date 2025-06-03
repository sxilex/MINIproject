import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { cloudinary } from "../config/cloudinary.js";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function getAllEvents(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const allEvents = await prisma.event.findMany({});

    const events = await prisma.event.findMany({
      skip: skip,
      take: +limit,
      include: {
        User: true,
        Image: true,
        Ticket: true,
      },
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
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    console.log("TICKET");

    const {
      title,
      description,
      location,
      quota,
      startedDate,
      startedTime,
      type,
    } = req.body;

    // Safely parse tickets JSON
    let tickets: any[] = [];
    try {
      tickets = JSON.parse(req.body.tickets || "[]");
    } catch (err) {
      res.status(400).json({ message: "Invalid tickets format" });
      return;
    }

    // Parse uploaded files
    const files = req.files as { [key: string]: Express.Multer.File[] };
    const userId = req.user.id;

    let imageData: { url: string }[] = [];

    if (files && files["image"]) {
      for (const el of files["image"]) {
        const result = await cloudinary.uploader.upload(el.path, {
          folder: "event-images-storage",
        });

        imageData.push({ url: result.secure_url });

        await fs.unlink(el.path); // Remove uploaded file from server
      }
    }

    // If no image uploaded, use default
    if (imageData.length === 0) {
      imageData = [
        {
          url: "https://res.cloudinary.com/dah5sxwoy/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745306313/samples/man-portrait.jpg",
        },
      ];
    }

    // Create event in DB
    const newEvent = await prisma.event.create({
      data: {
        title,
        description,
        location,
        quota: +quota,
        startedDate: new Date(startedDate),
        startedTime,
        userId,
        type,
        Image: {
          create: imageData,
        },
        Ticket: {
          create: tickets.map((ticket) => ({
            price: ticket.price,
            quantity: ticket.quantity,
            userTicketLimit: ticket.userTicketLimit,
            ticketCategory: ticket.ticketCategory || "REGULAR",
          })),
        },
      },
    });

    res.status(201).json({ message: "Event Created!", event: newEvent });
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
