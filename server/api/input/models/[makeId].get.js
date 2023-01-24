import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { makeId } = event.context.params;
  return await prisma.model.findMany({
    where: {
      makeId: parseInt(makeId),
    },
  });
});
