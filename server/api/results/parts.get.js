import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  let {
    make,
    model,
    PartType,
    PartName,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
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

  if (make) {
    filters.makeId = "";
    filters.makeId = parseInt(make);
  }
  if (model) {
    filters.modelId = "";
    filters.modelId = parseInt(model);
  }
  if (region) {
    filters.regionId = "";
    filters.regionId = parseInt(region);
  }
  if (city) {
    filters.cityId = "";
    filters.cityId = parseInt(city);
  }

  if (PartType) {
    filters.PartTypeId = "";
    filters.PartTypeId = parseInt(PartType);
  }
  if (PartName) {
    filters.PartNameId = "";
    filters.PartNameId = parseInt(PartName);
  }

  const parts = await prisma.part.findMany({
    where: {
      ...filters,
    },
    select: {
      Make: {},
      Model: {},
      PartType: {},
      PartName: {},
      Region: {},
      City: {},
      id: true,
      year: true,
      price: true,
      createdAt: true,
      images: true,
    },
  });

  return parts;
});
