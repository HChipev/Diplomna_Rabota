import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;
  const savedParts = await prisma.user.findMany({
    where: {
      savedPartsId: {
        has: parseInt(listingId),
      },
    },
    select: {
      id: true,
      savedPartsId: true,
    },
  });

  for (let i = 0; i < savedParts.length; i++) {
    await prisma.user.update({
      where: {
        id: savedParts[i].id,
      },
      data: {
        savedPartsId: {
          set: savedParts[i].savedPartsId.filter(
            (id) => id !== parseInt(listingId)
          ),
        },
      },
    });
  }

  const deletedPart = await prisma.part.delete({
    where: {
      id: parseInt(listingId),
    },
  });
  return deletedPart;
});
