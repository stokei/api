import { Prisma, PrismaClient } from '@prisma/client';

import { defaultAppId } from '@/constants/default-app-id';
import { PlanType } from '@/enums/plan-type.enum';
import { PlanMapper } from '@/mappers/plans';

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
