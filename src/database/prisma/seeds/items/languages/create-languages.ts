import { Prisma, PrismaClient } from '@prisma/client';

import { LanguageMapper } from '@/mappers/languages';

const myLanguages = (): Prisma.LanguageCreateManyInput[] => [
  {
    id: 'pt-br',
    name: 'Português - BR'
  },
  {
    id: 'en',
    name: 'English'
  }
];

export const createLanguages = async ({
  prismaClient
}: {
  prismaClient: PrismaClient;
}) => {
  const languages = myLanguages();
  const languageIds = languages.map((language) => language.id);

  const languagesFounded = await prismaClient.language.findMany({
    where: {
      AND: {
        id: {
          in: languageIds
        }
      }
    }
  });

  const languagesToCreate = languages.filter((language) => {
    const existsLanguage = languagesFounded.find(
      (languageFounded) => languageFounded.id === language.id
    );
    return !existsLanguage;
  });

  const languagesCreated = await Promise.all(
    languagesToCreate.map((languageToCreate) =>
      prismaClient.language.create({ data: languageToCreate })
    )
  );
  return new LanguageMapper().toModels([
    ...languagesCreated,
    ...languagesFounded
  ]);
};
