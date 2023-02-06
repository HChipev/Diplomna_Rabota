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
    return await prisma.part.findMany({
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
        id: true,
        price: true,
        images: true,
      },
    });
  } else {
    return await prisma.part.findMany({
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
        id: true,
        price: true,
        images: true,
      },
    });
  }
});
