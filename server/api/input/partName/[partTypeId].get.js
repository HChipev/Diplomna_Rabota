import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { partTypeId } = event.context.params;
  const partNames = await prisma.partName.findMany({
    where: {
      partTypeId: parseInt(partTypeId),
    },
  });
  return partNames.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});
