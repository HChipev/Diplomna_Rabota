import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  message: Joi.string().required(),
  name: Joi.string().required(),
});
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { listingId } = event.context.params;
  const { error } = schema.validate(body);
  if (error) {
    throw createError({
      statusCode: 412,
      message: error.message,
    });
  }

  const { email, message, name } = body;

  return prisma.message.create({
    data: {
      email,
      message,
      name,
      carId: parseInt(listingId),
    },
  });
});
