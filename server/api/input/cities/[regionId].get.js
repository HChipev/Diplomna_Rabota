import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { regionId } = event.context.params;
  return await prisma.city.findMany({
    where: {
      regionId: parseInt(regionId),
    },
  });
});
