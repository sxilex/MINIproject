import { PrismaClient, Eventtype } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();


const events = [
  {
    title: "Bali Yoga Retreat & Wellness Week",
    description:
      "A serene yoga retreat designed to rejuvenate the mind and body. Includes meditation, healthy meals, and spa sessions.",
    location: "Ubud, Bali",
    quota: 80,
    type: Eventtype.PAID,
  },
  {
    title: "Digital Nomad Meetup",
    description:
      "Connect with fellow digital nomads over coffee and coworking. Ideal for networking and sharing tips.",
    location: "Canggu, Bali",
    quota: 50,
    type: Eventtype.FREE,
  },
  {
    title: "Island Photography Workshop",
    description:
      "Hands-on workshop with a professional photographer exploring the scenic beauty of Bali.",
    location: "Seminyak, Bali",
    quota: 25,
    type: Eventtype.PAID,
  },
  {
    title: "Sustainable Living Seminar",
    description:
      "Educational seminar on sustainable practices, eco-living, and local environmental efforts.",
    location: "Ubud, Bali",
    quota: 100,
    type: Eventtype.FREE,
  },
  {
    title: "Balinese Cooking Class",
    description:
      "Learn to cook authentic Balinese dishes with a local chef. Includes a market tour.",
    location: "Denpasar, Bali",
    quota: 20,
    type: Eventtype.PAID,
  },
  {
    title: "Beach Cleanup Drive",
    description:
      "Join the community in preserving Bali’s beaches. All equipment provided.",
    location: "Kuta Beach, Bali",
    quota: 200,
    type: Eventtype.FREE,
  },
  {
    title: "Sunset Surf Session",
    description:
      "Group surf lesson and beach hangout with local instructors. All levels welcome.",
    location: "Echo Beach, Bali",
    quota: 40,
    type: Eventtype.PAID,
  },
  {
    title: "Mindfulness & Breathwork Circle",
    description:
      "Guided session to cultivate presence and inner calm through breath and awareness.",
    location: "Ubud, Bali",
    quota: 30,
    type: Eventtype.FREE,
  },
  {
    title: "Art & Expression Jam",
    description:
      "Creative space to paint, draw, write, or dance. Materials provided, just bring your energy.",
    location: "Sanur, Bali",
    quota: 60,
    type: Eventtype.FREE,
  },
  {
    title: "Tropical Mixology Class",
    description:
      "Craft signature tropical cocktails with a pro bartender. Includes tastings and recipes.",
    location: "Seminyak, Bali",
    quota: 18,
    type: Eventtype.PAID,
  },
  {
    title: "Jungle Trek Adventure",
    description:
      "Guided trek through Bali’s lush jungle trails with stops at hidden waterfalls.",
    location: "Tegallalang, Bali",
    quota: 35,
    type: Eventtype.PAID,
  },
  {
    title: "Healing Sound Bath Evening",
    description:
      "Relax with therapeutic sound vibrations in a calming, communal setting.",
    location: "Ubud, Bali",
    quota: 70,
    type: Eventtype.FREE,
  },
];

const users = [
  {
    username: "rahmat_hidayat",
    email: "rahmat.hidayat92@gmail.com",
    password:"rahmat123",

    firstname: "Rahmat",
    lastname: "Hidayat",
    referalcode: "RAH3FZKQ",
  },
  {
    username: "fitri.novita",
    email: "fitrinovita@yahoo.com",
    password: "fitri456",

    firstname: "Fitri",
    lastname: "Novita",
    referalcode: "FIT8XZB2",
  },
  {
    username: "eko.santoso22",
    email: "eko.santoso22@outlook.com",
    password: "eko789",

    firstname: "Eko",
    lastname: "Santoso",
    referalcode: "EKOQ9MW1",
  },
  {
    username: "linda_mulyani",
    email: "linda.mulyani@gmail.com",
    password: "linda000",

    firstname: "Linda",
    lastname: "Mulyani",
    referalcode: "LIN7TCKD",
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
  },
  {
    text: "The yoga sessions were super relaxing, and the food was delicious. Would definitely come back next year.",
  },
  {
    text: "As a backend developer, I found the AI talks extremely relevant. Loved the casual vibe and networking sessions.",
  },
  {
    text: "Loved the vibe and the indie films. The riverside setup in Bandung was the perfect touch. Hope they host it again!",
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

    const userData = await prisma.user.findMany(); // Ambil semua user yang sudah dibuat. [{id: "1"}, {}, {}]
    await prisma.event.createMany({
      data: userData.map((user, index) => {
        return { ...events[index], userId: user.id };
      }),
    });

    const eventData = await prisma.event.findMany();
    await prisma.review.createMany({
      data: eventData.map((event, index) => {
        return {
          ...reviews[index],
          eventId: event.id,
          userId: userData[index].id,
        };
      }),
    });

    console.log(`SuckSeeded`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seeds();
