import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;
  return prisma.Car.findMany({
    where: {
      userId: user_id,
    },
    select: {
      Make: {
        select: {
          make: true,
        },
      },
      Model: {
        select: {
          model: true,
        },
      },
      id: true,
      price: true,
    },
  });
});
