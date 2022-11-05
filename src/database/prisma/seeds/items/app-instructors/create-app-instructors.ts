import { Prisma, PrismaClient } from '@prisma/client';

import { AppInstructorMapper } from '@/mappers/app-instructors';

const myAppInstructors = ({
  app,
  instructor
}: {
  instructor: string;
  app: string;
}): Prisma.AppInstructorCreateManyInput[] => [
  {
    app,
    instructor,
    createdBy: instructor
  }
];

export const createAppInstructors = async ({
  prismaClient,
  instructor,
  app
}: {
  prismaClient: PrismaClient;
  instructor: string;
  app: string;
}) => {
  const appInstructors = myAppInstructors({ app, instructor });
  const appInstructorIds = appInstructors.map(
    (appInstructor) => appInstructor.id
  );

  const appInstructorsFounded = await prismaClient.appInstructor.findMany({
    where: {
      AND: {
        id: {
          in: appInstructorIds
        }
      }
    }
  });

  const appInstructorsToCreate = appInstructors.filter((app) => {
    const existsAppInstructor = appInstructorsFounded.find(
      (appFounded) => appFounded.id === app.id
    );
    return !existsAppInstructor;
  });

  const appInstructorsCreated = await Promise.all(
    appInstructorsToCreate.map((appInstructorToCreate) =>
      prismaClient.appInstructor.create({ data: appInstructorToCreate })
    )
  );
  return new AppInstructorMapper().toModels([
    ...appInstructorsCreated,
    ...appInstructorsFounded
  ]);
};
