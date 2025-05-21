import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import fs from "fs/promises";

const prisma = new PrismaClient();

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await prisma.events.findMany();
    res.status(200).json({ data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all articles data" });
  }
}

export async function getEventId(req: Request, res: Response) {
  try {
    const id = req.params.eventsId;
    const event = await prisma.events.findUnique({ where: { id: id } });
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: "Failed to get the event data" });
  }
}

export async function createEvents(req: Request, res: Response) {
  try {
    const { title, description, location, quota, type } = req.body;
    const userId = req.user.id;

    await prisma.events.create({
      data: {
        title,
        description,
        location,
        quota,
        type,
        id: userId,
      },
    });

    res.status(201).json({ message: "Event Created!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create the Event" });
  }
}

export async function deleteAll(req: Request, res: Response) {
  try {
    await prisma.events.deleteMany();
    res.status(200).json({ message: `Successfully Deleted All ARTICLES` });
  } catch (error) {
    res.status(500);
  }
}
