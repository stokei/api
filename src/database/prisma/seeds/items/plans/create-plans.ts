import { Prisma, PrismaClient } from '@prisma/client';

import { defaultAppId } from '@/constants/default-app-id';
import { CreateProductDTO } from '@/dtos/products/create-product.dto';
import { PlanType } from '@/enums/plan-type.enum';
import { PlanMapper } from '@/mappers/plans';
import { ProductMapper } from '@/mappers/products';
import { CreateStripeProductService } from '@/services/stripe/create-stripe-product';
import { CreateStripePriceService } from '@/services/stripe/create-stripe-price';
import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { ProductModel } from '@/models/product.model';
import { PriceMapper } from '@/mappers/prices';

const myPlans = (): Prisma.PlanCreateManyInput[] => [
  {
    name: 'Serviço de Administradores',
    app: defaultAppId,
    type: PlanType.ADMIN,
    active: true
  },
  {
    name: 'Serviço de Cursos',
    app: defaultAppId,
    type: PlanType.COURSE,
    active: true
  },
  {
    name: 'Serviço de Domínios',
    app: defaultAppId,
    type: PlanType.DOMAIN,
    active: true
  },
  {
    name: 'Serviço de Professores',
    app: defaultAppId,
    type: PlanType.INSTRUCTOR,
    active: true
  },
  {
    name: 'Serviço de Storage',
    app: defaultAppId,
    type: PlanType.STORAGE,
    active: true
  }
];

const createProduct = async ({
  prismaClient,
  data
}: {
  data: CreateProductDTO;
  prismaClient: PrismaClient;
}) => {
  const stripeProduct = await new CreateStripeProductService().execute({
    app: data.app,
    name: data.name,
    description: data.description,
    stripeAccount: null
  });
  const product = await prismaClient.product.create({
    data: {
      ...data,
      stripeProduct: stripeProduct.id
    }
  });
  if (!product) {
    return null;
  }
  return new ProductMapper().toModel(product);
};

const createPrice = async ({
  prismaClient,
  data,
  product
}: {
  data: CreatePriceDTO;
  product: ProductModel;
  prismaClient: PrismaClient;
}) => {
  const priceMapper = new PriceMapper();
  const stripePrice = await new CreateStripePriceService().execute({
    amount: data.amount,
    currency: data.currency,
    billingScheme: priceMapper.billingSchemeToStripeBillingScheme(
      data.billingScheme
    ),
    tiers: tiers,
    tiersMode: priceMapper.tiersModeToStripeTiersMode(data.tiersMode),
    app: data.app,
    recurring: data.recurring,
    type: data.type,
    stripeProduct: product.stripeProduct,
    stripeAccount: null
  });
  const price = await prismaClient.price.create({
    data: {
      ...data,
      stripePrice: stripePrice.id
    }
  });
  if (!price) {
    return null;
  }
  return priceMapper.toModel(price);
};

export const createPlans = async ({
  prismaClient
}: {
  prismaClient: PrismaClient;
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

  const plansCreated = await Promise.all(
    plansToCreate.map(async (planToCreate) =>
      prismaClient.plan.create({ data: planToCreate })
    )
  );

  return new PlanMapper().toModels([...plansCreated, ...plansFounded]);
};
