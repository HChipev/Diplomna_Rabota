import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;
  const savedCars = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      savedCarsId: true,
    },
  });
  return await prisma.car.findMany({
    where: {
      id: {
        in: savedCars.savedCarsId,
      },
    },
    select: {
      Make: {},
      Model: {},
      Engine: {},
      Gearbox: {},
      Drivetrain: {},
      Region: {},
      City: {},
      Color: {},
      id: true,
      year: true,
      price: true,
      horsepower: true,
      mileage: true,
      description: true,
      createdAt: true,
      features: true,
      isOnParts: true,
      images: true,
    },
  });
});
