import { Prisma, PrismaClient } from '@prisma/client';

import { CurrencyMapper } from '@/mappers/currencies';

const myCurrencies = (): Prisma.CurrencyCreateManyInput[] => [
  {
    id: 'BRL',
    name: 'Real',
    symbol: 'R$',
    minorUnit: 2
  },
  {
    id: 'USD',
    name: 'Dollar',
    symbol: '$',
    minorUnit: 2
  }
];

export const createCurrencies = async ({
  prismaClient
}: {
  prismaClient: PrismaClient;
}) => {
  const currencies = myCurrencies();
  const currencyIds = currencies.map((currency) => currency.id);

  const currenciesFounded = await prismaClient.currency.findMany({
    where: {
      AND: {
        id: {
          in: currencyIds
        }
      }
    }
  });

  const currenciesToCreate = currencies.filter((currency) => {
    const existsCurrency = currenciesFounded.find(
      (currencyFounded) => currencyFounded.id === currency.id
    );
    return !existsCurrency;
  });

  const currenciesCreated = await Promise.all(
    currenciesToCreate.map((currencyToCreate) =>
      prismaClient.currency.create({ data: currencyToCreate })
    )
  );
  return new CurrencyMapper().toModels([
    ...currenciesCreated,
    ...currenciesFounded
  ]);
};
