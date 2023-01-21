import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const schema = Joi.object({
  make_id: Joi.number().integer().required(),
  year: Joi.number()
    .integer()
    .min(1930)
    .max(new Date().getFullYear() + 1)
    .required(),
  price: Joi.number().integer().min(0).required(),
  engine_id: Joi.number().integer().required(),
  gearbox_id: Joi.number().integer().required(),
  drivetrain_id: Joi.number().integer().required(),
  region_id: Joi.number().integer().required(),
  mileage: Joi.number().integer().min(0).required(),
  features: Joi.array().items(Joi.string()),
  description: Joi.string(),
  color_id: Joi.number().integer(),
  is_on_parts: Joi.boolean().required(),
  users: Joi.string().required(),
  horsepower: Joi.number().integer().min(0).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { error, value } = schema.validate(body);
  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }
  const {
    make,
    model,
    year,
    price,
    engine,
    gearbox,
    drivetrain,
    region,
    city,
    mileage,
    features,
    description,
    color,
    is_on_parts,
    user_id,
  } = body;
  const car = await prisma.cars.create({
    data: {
      make,
      model,
      year,
      price,
      engine,
      gearbox,
      drivetrain,
      region,
      city,
      mileage,
      features,
      description,
      color,
      is_on_parts,
      user_id,
    },
  });

  return car;
});
