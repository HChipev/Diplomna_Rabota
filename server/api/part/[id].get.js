import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  console.log(event.context.params, "part id");
  const { id } = event.context.params;
  const part = await prisma.part.findUnique({
    where: {
      id: parseInt(id),
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
      description: true,
      createdAt: true,
      userId: true,
    },
  });

  if (!part) {
    throw createError({
      statusCode: 404,
      statusMessage: "Part does not exist",
    });
  }
  return part;
});
