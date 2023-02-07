import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;
  const savedCars = await prisma.user.findMany({
    where: {
      savedCarsId: {
        has: parseInt(listingId),
      },
    },
    select: {
      id: true,
      savedCarsId: true,
    },
  });

  for (let i = 0; i < savedCars.length; i++) {
    await prisma.user.update({
      where: {
        id: savedCars[i].id,
      },
      data: {
        savedCarsId: {
          set: savedCars[i].savedCarsId.filter(
            (id) => id !== parseInt(listingId)
          ),
        },
      },
    });
  }

  const deletedCar = await prisma.car.delete({
    where: {
      id: parseInt(listingId),
    },
  });
  return deletedCar;
});
