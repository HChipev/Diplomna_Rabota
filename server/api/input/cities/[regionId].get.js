import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { regionId } = event.context.params;
  const cities = await prisma.city.findMany({
    where: {
      regionId: parseInt(regionId),
    },
  });
  return cities.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});
