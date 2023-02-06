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
        partId: {
          not: null,
        },
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        partId: true,
      },
    });
  } else {
    messages = await prisma.message.findMany({
      where: {
        partId: {
          not: null,
        },
      },
      select: {
        id: true,
        message: true,
        createdAt: true,
        partId: true,
      },
    });
  }
  const messageToPart = await prisma.part.findMany({
    where: {
      id: messages.partId,
    },
    select: {
      PartType: {
        select: {
          name: true,
        },
      },
      PartName: {
        select: {
          name: true,
        },
      },

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
      images: true,
    },
  });
  const myMessages = messages.map((message) => {
    const part = messageToPart.find((part) => part.id === message.partId);

    return {
      ...message,
      part,
    };
  });
  return myMessages;
});
