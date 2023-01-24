import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  console.log(event.context.params);
  const { id } = event.context.params;
  const car = await prisma.car.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: "Car does not exist",
    });
  }
  return car;
});
