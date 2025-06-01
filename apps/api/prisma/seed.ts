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
    password: "rahmat123",

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
  {
    username: "john_doe91",
    email: "john.doe91@gmail.com",
    password: "john1234",
    firstname: "John",
    lastname: "Doe",
    referalcode: "JOH9DKXE",
  },
  {
    username: "sarah_lee88",
    email: "sarah.lee88@yahoo.com",
    password: "sarahlee88",
    firstname: "Sarah",
    lastname: "Lee",
    referalcode: "SAR4MNZP",
  },
  {
    username: "michael_chan22",
    email: "michael.chan22@hotmail.com",
    password: "mikechan22",
    firstname: "Michael",
    lastname: "Chan",
    referalcode: "MIC2WTRQ",
  },
  {
    username: "anna_budi",
    email: "anna.budi@gmail.com",
    password: "anna4567",
    firstname: "Anna",
    lastname: "Budi",
    referalcode: "ANN6QRLP",
  },
  {
    username: "reza_hakim",
    email: "reza.hakim@outlook.com",
    password: "reza1234",
    firstname: "Reza",
    lastname: "Hakim",
    referalcode: "REZ7UYTN",
  },
  {
    username: "nina_putri",
    email: "nina.putri@gmail.com",
    password: "nina9876",
    firstname: "Nina",
    lastname: "Putri",
    referalcode: "NIN5TKLM",
  },
  {
    username: "aditya_firmansyah",
    email: "aditya.firmansyah@yahoo.com",
    password: "aditya000",
    firstname: "Aditya",
    lastname: "Firmansyah",
    referalcode: "ADI3XZVB",
  },
  {
    username: "melisa_tan",
    email: "melisa.tan@gmail.com",
    password: "melisa789",
    firstname: "Melisa",
    lastname: "Tan",
    referalcode: "MEL8BCDR",
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
  {
    text: "Such a magical night! The lights, the music, and the open-air cinema made it unforgettable.",
  },
  {
    text: "First time attending an event like this and I'm hooked. Great selection of short films!",
  },
  {
    text: "Bandung always surprises me. The venue was cozy and the atmosphere super chill.",
  },
  {
    text: "I came for the films but stayed for the people and the food trucks. Amazing experience!",
  },
  {
    text: "The indie films were so thought-provoking. Definitely felt like a creative haven.",
  },
  {
    text: "Perfect date night. My partner and I loved every minute of it.",
  },
  {
    text: "I wish there were more events like this. It felt like a little piece of a film festival paradise.",
  },
  {
    text: "Great job to the organizers! Everything from the seating to the audio setup was spot on.",
  },
];

async function seeds() {
  try {
    await prisma.category.deleteMany();
    await prisma.review.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          firstname: user.firstname,
          username: user.username,
          email: user.email,
          password: hashedPassword,
          lastname: user.lastname,
          referalcode: user.referalcode,
        };
      })
    );

    await prisma.category.createMany({ data: category });
    await prisma.user.createMany({
      data: usersWithHashedPasswords,
    });

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
