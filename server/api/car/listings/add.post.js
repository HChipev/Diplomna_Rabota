import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const schema = Joi.object({
  makeId: Joi.number().integer().required(),
  modelId: Joi.number().integer().required(),
  engineId: Joi.number().integer().required(),
  gearboxId: Joi.number().integer().required(),
  drivetrainId: Joi.number().integer().required(),
  regionId: Joi.number().integer().required(),
  cityId: Joi.number().integer().required(),
  colorId: Joi.number().integer(),
  year: Joi.number()
    .integer()
    .min(1930)
    .max(new Date().getFullYear())
    .required(),
  price: Joi.number().integer().min(0).required(),
  horsepower: Joi.number().integer().min(0).required(),
  mileage: Joi.number().integer().min(0).required(),
  features: Joi.array().items(
    Joi.object().keys({ feature: Joi.string(), category: Joi.string() })
  ),
  description: Joi.string().empty(""),
  isOnParts: Joi.boolean().required(),
  userId: Joi.string().required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { error, value } = schema.validate(body);
  if (error) {
    console.log(error);
    console.log(error.message);
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }
  const {
    makeId,
    modelId,
    engineId,
    gearboxId,
    drivetrainId,
    regionId,
    cityId,
    colorId,
    year,
    price,
    horsepower,
    mileage,
    features,
    description,
    isOnParts,
    userId,
  } = value;

  const car = await prisma.Car.create({
    data: {
      makeId,
      modelId,
      engineId,
      gearboxId,
      drivetrainId,
      regionId,
      cityId,
      colorId,
      year,
      price,
      horsepower,
      mileage,
      features,
      description,
      isOnParts,
      userId,
    },
  });

  return car;
});
