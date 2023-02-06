import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { user_id } = event.context.params;
  return await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    select: {
      role: true,
    },
  });
});
