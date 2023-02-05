import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const body = await readBody(event);
  const savedParts = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      savedPartsId: true,
    },
  });
  if (savedParts.savedPartsId.includes(body.partId)) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedPartsId: {
          set: savedParts.savedPartsId.filter(
            (partId) => partId !== body.partId
          ),
        },
      },
    });
  } else {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedPartsId: {
          push: body.partId,
        },
      },
    });
  }
});
