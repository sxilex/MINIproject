import { PrismaClient, Eventtype } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const events = [
  {
    title: "Island Pop Fiesta",
    description:
      "A vibrant pop music bash featuring colorful performances and tropical cocktails.",
    location: "Jimbaran Bay, Bali",
    quota: 280,
    type: Eventtype.PAID,
    startedDate: "2025-09-13T12:00:00Z",
    startedTime: "18:00",
  },
  {
    title: "Midnight Jazz Flow",
    description:
      "Let smooth saxophones guide your soul at this midnight jazz experience.",
    location: "Nusa Dua Jazz Pavilion",
    quota: 130,
    type: Eventtype.PAID,
    startedDate: "2025-09-14T12:00:00Z",
    startedTime: "23:00",
  },
  {
    title: "Lava Rock Explosion",
    description:
      "A volcanic lineup of hard rock bands ready to shake the island.",
    location: "Mount Batur Base Camp",
    quota: 450,
    type: Eventtype.PAID,
    startedDate: "2025-09-15T12:00:00Z",
    startedTime: "19:45",
  },
  {
    title: "Roots Reggae Night",
    description:
      "Dive into the soul of reggae with island drums and a laid-back groove.",
    location: "Lovina Beachfront",
    quota: 220,
    type: Eventtype.PAID,
    startedDate: "2025-09-16T12:00:00Z",
    startedTime: "17:15",
  },
  {
    title: "Pop Lights & Dance",
    description:
      "Dance into the night under neon lights with top pop performers.",
    location: "Sky Garden Rooftop, Bali",
    quota: 300,
    type: Eventtype.PAID,
    startedDate: "2025-09-17T12:00:00Z",
    startedTime: "20:00",
  },
  {
    title: "Sax & Sunset",
    description:
      "An intimate sunset jazz session featuring live sax and cocktails.",
    location: "Tegalalang Rice Terrace Lounge",
    quota: 90,
    type: Eventtype.PAID,
    startedDate: "2025-09-18T12:00:00Z",
    startedTime: "18:15",
  },
  {
    title: "Blazing Rock Arena",
    description:
      "Turn up the volume for a night of blazing riffs and stage pyrotechnics.",
    location: "Bali Rock Dome",
    quota: 480,
    type: Eventtype.PAID,
    startedDate: "2025-09-19T12:00:00Z",
    startedTime: "21:30",
  },
  {
    title: "Beach Reggae Chill",
    description:
      "Feel the rhythm and let loose at this chill reggae gathering by the sea.",
    location: "Padang Padang Beach",
    quota: 200,
    type: Eventtype.PAID,
    startedDate: "2025-09-20T12:00:00Z",
    startedTime: "16:45",
  },
  {
    title: "Pop Dreams Live",
    description:
      "Watch young pop stars light up the stage with stunning visuals and sound.",
    location: "Bali Convention Center",
    quota: 260,
    type: Eventtype.PAID,
    startedDate: "2025-09-21T12:00:00Z",
    startedTime: "19:00",
  },
  {
    title: "Jazz Breeze Lounge",
    description:
      "A coastal jazz lounge night filled with breezy tunes and ocean views.",
    location: "Candidasa Seaside Venue",
    quota: 140,
    type: Eventtype.PAID,
    startedDate: "2025-09-22T12:00:00Z",
    startedTime: "20:30",
  },
  {
    title: "Riff Revival: Rock Legacy",
    description:
      "Tributes to legendary rock bands in a night of classic energy.",
    location: "Legian Sound Arena",
    quota: 390,
    type: Eventtype.PAID,
    startedDate: "2025-09-23T12:00:00Z",
    startedTime: "19:30",
  },
  {
    title: "Island Reggae Grooves",
    description:
      "Feel-good reggae sounds from across the globe with tropical vibes.",
    location: "Amed Beach Stage",
    quota: 210,
    type: Eventtype.PAID,
    startedDate: "2025-09-24T12:00:00Z",
    startedTime: "17:00",
  },
];

const users = [
  {
    username: "rahmat_hidayat",
    email: "rahmat.hidayat92@gmail.com",
    password: "rahmat123",

    firstname: "Rahmat",
    lastname: "Hidayat",
    referralcode: "RAH3FZKQ",
  },
  {
    username: "fitri.novita",
    email: "fitrinovita@yahoo.com",
    password: "fitri456",

    firstname: "Fitri",
    lastname: "Novita",
    referralcode: "FIT8XZB2",
  },
  {
    username: "eko.santoso22",
    email: "eko.santoso22@outlook.com",
    password: "eko789",

    firstname: "Eko",
    lastname: "Santoso",
    referralcode: "EKOQ9MW1",
  },
  {
    username: "linda_mulyani",
    email: "linda.mulyani@gmail.com",
    password: "linda000",

    firstname: "Linda",
    lastname: "Mulyani",
    referralcode: "LIN7TCKD",
  },
  {
    username: "john_doe91",
    email: "john.doe91@gmail.com",
    password: "john1234",
    firstname: "John",
    lastname: "Doe",
    referralcode: "JOH9DKXE",
  },
  {
    username: "sarah_lee88",
    email: "sarah.lee88@yahoo.com",
    password: "sarahlee88",
    firstname: "Sarah",
    lastname: "Lee",
    referralcode: "SAR4MNZP",
  },
  {
    username: "michael_chan22",
    email: "michael.chan22@hotmail.com",
    password: "mikechan22",
    firstname: "Michael",
    lastname: "Chan",
    referralcode: "MIC2WTRQ",
  },
  {
    username: "anna_budi",
    email: "anna.budi@gmail.com",
    password: "anna4567",
    firstname: "Anna",
    lastname: "Budi",
    referralcode: "ANN6QRLP",
  },
  {
    username: "reza_hakim",
    email: "reza.hakim@outlook.com",
    password: "reza1234",
    firstname: "Reza",
    lastname: "Hakim",
    referralcode: "REZ7UYTN",
  },
  {
    username: "nina_putri",
    email: "nina.putri@gmail.com",
    password: "nina9876",
    firstname: "Nina",
    lastname: "Putri",
    referralcode: "NIN5TKLM",
  },
  {
    username: "aditya_firmansyah",
    email: "aditya.firmansyah@yahoo.com",
    password: "aditya000",
    firstname: "Aditya",
    lastname: "Firmansyah",
    referralcode: "ADI3XZVB",
  },
  {
    username: "melisa_tan",
    email: "melisa.tan@gmail.com",
    password: "melisa789",
    firstname: "Melisa",
    lastname: "Tan",
    referralcode: "MEL8BCDR",
  },
];

const category = [
  { name: "Jazz" },
  { name: "Rock" },
  { name: "Reggae" },
  { name: "Pop" },
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

    await prisma.coupon.deleteMany();

    await prisma.point.deleteMany();

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
          referralcode: user.referralcode,
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
