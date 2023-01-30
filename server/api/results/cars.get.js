import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  let {
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    minMileage,
    maxMileage,
    color,
    engine,
    gearbox,
    derivetrain,
    region,
    city,
    features,
  } = getQuery(event);
  const filters = {};
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) {
      filters.price.gte = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.price.lte = parseInt(maxPrice);
    }
  }
  if (minYear || maxYear) {
    filters.year = {};
    if (minYear) {
      filters.year.gte = parseInt(minYear);
    }
    if (maxYear) {
      filters.year.lte = parseInt(maxYear);
    }
  }

  if (minMileage || maxMileage) {
    filters.mileage = {};
    if (minMileage) {
      filters.mileage.gte = parseInt(minMileage);
    }
    if (maxMileage) {
      filters.mileage.lte = parseInt(maxMileage);
    }
  }

  if (make) {
    filters.makeId = "";
    filters.makeId = parseInt(make);
  }
  if (model) {
    filters.modelId = "";
    filters.modelId = parseInt(model);
  }
  if (engine) {
    filters.engineId = "";
    filters.engineId = parseInt(engine);
  }
  if (gearbox) {
    filters.gearboxId = "";
    filters.gearboxId = parseInt(gearbox);
  }
  if (derivetrain) {
    filters.derivetrainId = "";
    filters.derivetrainId = parseInt(derivetrain);
  }
  if (region) {
    filters.regionId = "";
    filters.regionId = parseInt(region);
  }
  if (city) {
    filters.cityId = "";
    filters.cityId = parseInt(city);
  }
  if (color) {
    filters.colorId = "";
    filters.colorId = parseInt(color);
  }
  if (features) {
    features = JSON.parse(features);
  }

  const cars = await prisma.car.findMany({
    where: {
      ...filters,
      ...(features
        ? {
            features: {
              hasSome: features,
            },
          }
        : {}),
    },
    select: {
      Make: {},
      Model: {},
      Engine: {},
      Gearbox: {},
      Drivetrain: {},
      Region: {},
      City: {},
      Color: {},
      id: true,
      year: true,
      price: true,
      horsepower: true,
      mileage: true,
      description: true,
      createdAt: true,
      features: true,
      isOnParts: true,
    },
  });

  return cars;
});
