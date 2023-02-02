import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "bg"] },
    })
    .required(),
  message: Joi.string().min(3).required(),
  name: Joi.string().required(),
  phone: Joi.string().min(10).required(),
});
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { listingId } = event.context.params;
  const { error } = schema.validate(body);
  if (error) {
    return {
      statusCode: 412,
      body: { message: error.message },
    };
  }

  const { email, message, name, phone } = body;

  return prisma.message.create({
    data: {
      email,
      message,
      name,
      phone,
      partId: parseInt(listingId),
    },
  });
});
