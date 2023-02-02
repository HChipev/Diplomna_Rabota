import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { partTypeId } = event.context.params;
  return await prisma.partName.findMany({
    where: {
      partTypeId: parseInt(partTypeId),
    },
  });
});
