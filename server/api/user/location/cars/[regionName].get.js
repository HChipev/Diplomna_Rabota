import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  let { regionName } = event.context.params;
  regionName = regionName.replaceAll("%20", " ");
  console.log(regionName);
  const region = await prisma.region.findFirst({
    where: {
      name: regionName,
    },
    select: {
      id: true,
    },
  });
  const cars = await prisma.car.findMany({
    where: {
      regionId: region.id,
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
  return cars.length > 6 ? cars.slice(0, 6) : cars;
});
