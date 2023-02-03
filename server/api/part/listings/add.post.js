import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const schema = Joi.object({
  makeId: Joi.number().integer().required(),
  modelId: Joi.number().integer().required(),
  regionId: Joi.number().integer().required(),
  cityId: Joi.number().integer().required(),
  partTypeId: Joi.number().integer().required(),
  partNameId: Joi.number().integer().required(),
  year: Joi.number()
    .integer()
    .min(1930)
    .max(new Date().getFullYear())
    .required(),
  price: Joi.number().integer().min(0).required(),
  images: Joi.array().items(Joi.string()).required(),
  description: Joi.string().empty(""),
  userId: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { error, value } = schema.validate(body);
  if (error) {
    return {
      statusCode: 412,
      body: { message: error.message },
    };
  }
  const {
    makeId,
    modelId,
    partTypeId,
    partNameId,
    regionId,
    cityId,
    year,
    price,
    description,
    userId,
    images,
  } = value;

  const part = await prisma.part.create({
    data: {
      makeId,
      modelId,
      partTypeId,
      partNameId,
      regionId,
      cityId,
      year,
      price,
      description,
      userId,
      images,
    },
  });

  return part;
});
