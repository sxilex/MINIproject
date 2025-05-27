import { PrismaClient, Eventtype } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const events = [
  {
    title: "Jakarta Startup Festival 2025",
    description:
      "An annual gathering of Indonesia's top startup founders, investors, and tech enthusiasts. Keynotes, pitch battles, and networking sessions.",
    location: "Jakarta Convention Center, Jakarta",
    quota: 500,
    type: Eventtype.PAID,
  },
  {
    title: "Bali Yoga Retreat & Wellness Week",
    description:
      "A serene yoga retreat designed to rejuvenate the mind and body. Includes meditation, healthy meals, and spa sessions.",
    location: "Ubud, Bali",
    quota: 80,
    type: Eventtype.PAID,
  },
  {
    title: "Surabaya DevTalk 2025",
    description:
      "A free tech meetup for developers in East Java. Talks on AI, backend engineering, and cloud infrastructure.",
    location: "Universitas Airlangga, Surabaya",
    quota: 200,
    type: Eventtype.PAID,
  },
  {
    title: "Bandung Indie Film Screening",
    description:
      "An outdoor film night showcasing independent Indonesian filmmakers. Open to the public, with live music and food stalls.",
    location: "Cikapundung River Spot, Bandung",
    quota: 300,
    type: Eventtype.FREE,
  },
];

const users = [
  {
    username: "rahmat_hidayat",
    email: "rahmat.hidayat92@gmail.com",
    password: "rahmat123",
    eventsId: null,
    firstName: "Rahmat",
    lastName: "Hidayat",
    referralCode: "RAH3FZKQ",
  },
  {
    username: "fitri.novita",
    email: "fitrinovita@yahoo.com",
    password: "fitri456",
    eventsId: null,
    firstName: "Fitri",
    lastName: "Novita",
    referralCode: "FIT8XZB2",
  },
  {
    username: "eko.santoso22",
    email: "eko.santoso22@outlook.com",
    password: "eko789",
    eventsId: null,
    firstName: "Eko",
    lastName: "Santoso",
    referralCode: "EKOQ9MW1",
  },
  {
    username: "linda_mulyani",
    email: "linda.mulyani@gmail.com",
    password: "linda000",
    eventsId: null,
    firstName: "Linda",
    lastName: "Mulyani",
    referralCode: "LIN7TCKD",
  },
  {
    username: "andre.yusuf",
    email: "andre.yusuf99@mail.com",
    password: "andre999",
    eventsId: null,
    firstName: "Andre",
    lastName: "Yusuf",
    referralCode: "AND5RPL0",
  },
];

const category = [
  { name: "Jazz" },
  { name: "Rock" },
  { name: "Reggie" },
  { name: "Comedy" },
];

const reviews = [
  {
    text: "Great event! Learned a lot from the keynote speakers and met some amazing people in the startup world.",
    eventsId: null,
  },
  {
    text: "The yoga sessions were super relaxing, and the food was delicious. Would definitely come back next year.",
    eventsId: null,
  },
  {
    text: "As a backend developer, I found the AI talks extremely relevant. Loved the casual vibe and networking sessions.",
    eventsId: null,
  },
  {
    text: "Loved the vibe and the indie films. The riverside setup in Bandung was the perfect touch. Hope they host it again!",
    eventsId: null,
  },
];

async function seeds() {
  try {
    await prisma.category.deleteMany();
    await prisma.review.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

    await prisma.category.createMany({ data: category });
    await prisma.user.createMany({ data: users });
    await prisma.event.createMany({ data: events });
    await prisma.review.createMany({ data: reviews });

    console.log(`SuckSeeded`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seeds();
