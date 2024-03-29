import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;
  const role = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      role: true,
    },
  });
  let messages;
  if (role.role !== "admin") {
    messages = await prisma.message.findMany({
      where: {
        userId: user_id,
        carId: {
          not: null,
        },
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        carId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    messages = await prisma.message.findMany({
      where: {
        carId: {
          not: null,
        },
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        carId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  const messageToCar = await prisma.car.findMany({
    where: {
      id: messages.carId,
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
      year: true,
      price: true,
      isOnParts: true,
      images: true,
    },
  });
  const myMessages = messages.map((message) => {
    const car = messageToCar.find((car) => car.id === message.carId);
    return {
      ...message,
      car,
    };
  });
  return myMessages;
});
