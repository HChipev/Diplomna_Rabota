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
  if (role.role !== "admin") {
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
        createdAt: true,
      },
    });
  } else {
    return await prisma.car.findMany({
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
        createdAt: true,
      },
    });
  }
});
