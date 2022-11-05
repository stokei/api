import { Prisma, PrismaClient } from '@prisma/client';

import { AppAdminMapper } from '@/mappers/app-admins';

const myAppAdmins = ({
  app,
  admin
}: {
  admin: string;
  app: string;
}): Prisma.AppAdminCreateManyInput[] => [
  {
    app,
    admin,
    createdBy: admin
  }
];

export const createAppAdmins = async ({
  prismaClient,
  admin,
  app
}: {
  prismaClient: PrismaClient;
  admin: string;
  app: string;
}) => {
  const appAdmins = myAppAdmins({ app, admin });
  const appAdminIds = appAdmins.map((appAdmin) => appAdmin.id);

  const appAdminsFounded = await prismaClient.appAdmin.findMany({
    where: {
      AND: {
        id: {
          in: appAdminIds
        }
      }
    }
  });

  const appAdminsToCreate = appAdmins.filter((app) => {
    const existsAppAdmin = appAdminsFounded.find(
      (appFounded) => appFounded.id === app.id
    );
    return !existsAppAdmin;
  });

  const appAdminsCreated = await Promise.all(
    appAdminsToCreate.map((appAdminToCreate) =>
      prismaClient.appAdmin.create({ data: appAdminToCreate })
    )
  );
  return new AppAdminMapper().toModels([
    ...appAdminsCreated,
    ...appAdminsFounded
  ]);
};
