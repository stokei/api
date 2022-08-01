import { AppStatus, Prisma, PrismaClient } from '@prisma/client';
import { splitServiceId } from '@stokei/nestjs';

import { defaultAppId } from '@/constants/default-app-id';
import { AppMapper } from '@/mappers/apps';

const myApps = ({
  currency,
  admin,
  language
}: {
  admin: string;
  currency: string;
  language: string;
}): Prisma.AppCreateManyInput[] => [
  {
    id: splitServiceId(defaultAppId).id,
    slug: 'stokei',
    name: 'Stokei',
    parent: admin,
    status: AppStatus.ACTIVE,
    currency,
    language
  }
];

export const createApps = async ({
  prismaClient,
  admin,
  currency,
  language
}: {
  prismaClient: PrismaClient;
  admin: string;
  currency: string;
  language: string;
}) => {
  const apps = myApps({ currency, admin, language });
  const appIds = apps.map((app) => app.id);

  const appsFounded = await prismaClient.app.findMany({
    where: {
      AND: {
        id: {
          in: appIds
        }
      }
    }
  });

  const appsToCreate = apps.filter((app) => {
    const existsApp = appsFounded.find(
      (appFounded) => appFounded.id === app.id
    );
    return !existsApp;
  });

  const appsCreated = await Promise.all(
    appsToCreate.map((appToCreate) =>
      prismaClient.app.create({ data: appToCreate })
    )
  );
  return new AppMapper().toModels([...appsCreated, ...appsFounded]);
};
