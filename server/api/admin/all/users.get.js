import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    where: {
      role: "user",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      phone: true,
      createdAt: true,
    },
  });
  return users;
});
