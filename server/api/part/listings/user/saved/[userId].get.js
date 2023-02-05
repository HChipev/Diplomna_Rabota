import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const savedParts = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      savedPartsId: true,
    },
  });
  return await prisma.part.findMany({
    where: {
      id: {
        in: savedParts.savedPartsId,
      },
    },
    select: {
      Make: {},
      Model: {},
      PartType: {},
      PartName: {},
      Region: {},
      City: {},
      id: true,
      year: true,
      price: true,
      createdAt: true,
      images: true,
    },
  });
});
