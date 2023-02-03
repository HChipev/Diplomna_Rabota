import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;

  return await prisma.car.findMany({
    where: {
      userId: user_id,
    },
    select: {
      Make: {
        select: {
          name: true,
        },
      },
      Model: {
        select: {
          name: true,
        },
      },
      id: true,
      price: true,
      isOnParts: true,
      images: true,
    },
  });
});
