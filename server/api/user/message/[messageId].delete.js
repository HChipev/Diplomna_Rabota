import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { messageId } = event.context.params;
  const message = await prisma.message.delete({
    where: {
      id: parseInt(messageId),
    },
  });
  return message;
});
