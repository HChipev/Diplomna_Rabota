import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { makeId } = event.context.params;
  const models = await prisma.model.findMany({
    where: {
      makeId: parseInt(makeId),
    },
  });
  return models.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});
