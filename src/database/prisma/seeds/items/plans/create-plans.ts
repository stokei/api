import {
  InventoryType,
  PlanStatus,
  PlanType,
  PriceType,
  Prisma,
  PrismaClient
} from '@prisma/client';

import { defaultAppId } from '@/constants/default-app-id';
import { FREE_PLAN_PURCHASE_URL } from '@/environments';
import { PlanNotFoundException, ProductNotFoundException } from '@/errors';
import { PlanMapper } from '@/mappers/plans';
import { PriceMapper } from '@/mappers/prices';
import { ProductMapper } from '@/mappers/products';
import { PlanModel } from '@/models/plan.model';
import { ProductModel } from '@/models/product.model';

const myPlans = (): Prisma.PlanCreateManyInput[] => {
  return [
    {
      id: 'free',
      name: 'Free',
      type: PlanType.FREE,
      checkoutVisible: true,
      hasCustomDomain: false,
      hasCustomSite: false,
      quantityCourses: 1,
      quantityInstructorPerCourses: 1,
      quantityClassroomsPerCourses: 1,
      quantityModulesPerClassrooms: 1,
      quantityVideosPerModules: 1,
      applicationFeePercentage: 1500,
      status: PlanStatus.ACTIVE
    }
  ];
};

const createProduct = async ({
  prismaClient,
  plan
}: {
  plan: PlanModel;
  prismaClient: PrismaClient;
}) => {
  if (!plan) {
    throw new PlanNotFoundException();
  }
  const product = await prismaClient.product.create({
    data: {
      app: defaultAppId,
      checkoutVisible: plan.checkoutVisible,
      externalProduct: plan.id,
      name: plan.name,
      parent: plan.id,
      purchaseUrl: FREE_PLAN_PURCHASE_URL,
      active: true
    }
  });
  if (!product) {
    return null;
  }
  return new ProductMapper().toModel(product);
};

const createPrice = async ({
  prismaClient,
  product,
  currency
}: {
  product: ProductModel;
  prismaClient: PrismaClient;
  currency: string;
}) => {
  if (!product) {
    throw new ProductNotFoundException();
  }
  const price = await prismaClient.price.create({
    data: {
      parent: product.id,
      default: true,
      app: product.app,
      amount: 0,
      active: true,
      currency,
      type: PriceType.RECURRING,
      inventoryType: InventoryType.INFINITE
    }
  });
  if (!price) {
    return null;
  }
  return new PriceMapper().toModel(price);
};

export const createPlans = async ({
  prismaClient,
  currency
}: {
  prismaClient: PrismaClient;
  currency: string;
}) => {
  const plans = myPlans();
  const planIds = plans.map((plan) => plan.id);

  const plansFounded = await prismaClient.plan.findMany({
    where: {
      AND: {
        id: {
          in: planIds
        }
      }
    }
  });

  const plansToCreate = plans.filter((plan) => {
    const existsPlan = plansFounded.find(
      (planFounded) => planFounded.id === plan.id
    );
    return !existsPlan;
  });

  const plansCreated = (
    await Promise.all(
      plansToCreate.map(async (planToCreate) => {
        const plan = await prismaClient.plan.create({ data: planToCreate });
        if (plan) {
          const planModel = new PlanMapper().toModel(plan);
          const product = await createProduct({
            prismaClient,
            plan: planModel
          });
          await createPrice({ prismaClient, product, currency });
        }
        return null;
      })
    )
  ).filter(Boolean);

  return new PlanMapper().toModels([...plansCreated, ...plansFounded]);
};
