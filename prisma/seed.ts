import { BusinessSectorRevenueSource, Prisma, PrismaClient } from '@prisma/client';

const db = new PrismaClient({});

async function seedPermissions() {}

async function seedBusinessSectors() {
  let sectors = [
    {
      id: 1,
      description: 'Agriculture',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 2,
      description: 'Financial Service',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 3,
      description: 'Construction',
      code: 'CL',
      revenuesource: 'Client',
    },
    {
      id: 4,
      description: 'Education',
      code: 'SD',
      revenuesource: 'Student',
    },
    {
      id: 5,
      description: 'Health',
      code: 'PT',
      revenuesource: 'Patient',
    },
    {
      id: 6,
      description: 'Information Technology',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 7,
      description: 'Manufacturing',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 8,
      description: 'Real Esate',
      code: 'CL',
      revenuesource: 'Client',
    },
    {
      id: 9,
      description: 'Consulting Service',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 10,
      description: 'Trading',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 11,
      description: 'Media/Entertainment',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 12,
      description: 'Production',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 13,
      description: 'Other',
      code: 'CU',
      revenuesource: 'Customer',
    },
    {
      id: 14,
      description: 'Financial Services',
      code: 'CT',
      revenuesource: 'Citizen',
    },
    {
      id: 15,
      description: 'Federal Goverment',
      code: 'CT',
      revenuesource: 'Citizen',
    },
    {
      id: 16,
      description: 'State Goverment',
      code: 'CT',
      revenuesource: 'Citizen',
    },
    {
      id: 17,
      description: 'Local Goverment',
      code: 'CT',
      revenuesource: 'Citizen',
    },
    {
      id: 18,
      description: 'Legal Service',
      code: 'CL',
      revenuesource: 'Client',
    },
    {
      id: 19,
      description: 'Ministry department and agency',
      code: 'CT',
      revenuesource: 'Citizen',
    },
    {
      id: 20,
      description: 'Non Profit',
      code: 'CD',
      revenuesource: 'Donors',
    },
  ];

  let createSectors: Prisma.businessSectorCreateManyInput[] = sectors.map((sector) => {
    return {
      id: sector.id,
      name: sector.description,
      code: sector.code,
      revenueSource: sector.revenuesource.toUpperCase() as BusinessSectorRevenueSource,
    };
  });

  let result = await db.businessSector.createMany({ data: createSectors, skipDuplicates: true });
}

async function seedModules() {}

async function seedPlans() {
  let plans = await db.pricingPlan.findMany({ include: { productAddons: true } });
  return plans;
}

async function seed() {
  let plans = await seedPlans();
  console.log(plans);
}
