import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const body = await readBody(event);
  const savedCars = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      savedCarsId: true,
    },
  });
  if (savedCars.savedCarsId.includes(body.carId)) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedCarsId: {
          set: savedCars.savedCarsId.filter((carId) => carId !== body.carId),
        },
      },
    });
  } else {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        savedCarsId: {
          push: body.carId,
        },
      },
    });
  }
});
