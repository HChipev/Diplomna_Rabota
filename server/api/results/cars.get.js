import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler((event) => {
  const {
    make,
    model,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    engine,
    gearbox,
    region,
    city,
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
  return prisma.car.findMany({
    where: {
      Make: {
        name: {
          equals: make,
        },
      },
      Model: {
        name: {
          equals: model,
        },
      },
      Engine: {
        name: {
          equals: engine,
        },
      },
      Gearbox: {
        name: {
          equals: gearbox,
        },
      },
      Region: {
        name: {
          equals: region,
        },
      },
      City: {
        name: {
          equals: city,
        },
      },
      ...filters,
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
      isOnParts: true,
    },
  });
});
