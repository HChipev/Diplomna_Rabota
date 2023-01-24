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
        make: {
          equals: make,
        },
      },
      Model: {
        model: {
          equals: model,
        },
      },
      Engine: {
        engine: {
          equals: engine,
        },
      },
      Gearbox: {
        gearbox: {
          equals: gearbox,
        },
      },
      Region: {
        region: {
          equals: region,
        },
      },
      City: {
        city: {
          equals: city,
        },
      },
      ...filters,
    },
  });
});
