import {
  AccountRole,
  AccountStatus,
  Prisma,
  PrismaClient
} from '@prisma/client';

import { defaultAppId } from '@/constants/default-app-id';
import { AccountMapper } from '@/mappers/accounts';

const myAccounts = (): Prisma.AccountCreateManyInput[] => {
  const defaultPassword =
    'TFXVbN5kEVvRCRdCHT4z51SaePa7VSR3Q+HHf9pu8zH1g58w6nERFP4n3/yjpbDjTrLjrqgtDq0ISRFKARpoMw==';
  return [
    {
      id: 'stokei',
      firstname: 'Stokei',
      lastname: 'Admin',
      app: defaultAppId,
      status: AccountStatus.ACTIVE,
      email: 'admin@stokei.com',
      password: defaultPassword,
      salt: 'T2xko9DzwlhxQL7XA7nrCoWLCoHUSPjBwWeYR4XGbUtoJk73GbNQumRdc5rx/+t0TwxiFfeGPgowrHgwivHh5Q==',
      username: 'stokei',
      roles: [AccountRole.USER, AccountRole.ADMIN]
    }
  ];
};

export const createAccounts = async ({
  prismaClient
}: {
  prismaClient: PrismaClient;
}) => {
  const accounts = myAccounts();
  const accountIds = accounts.map((account) => account.id);

  const accountsFounded = await prismaClient.account.findMany({
    where: {
      AND: {
        id: {
          in: accountIds
        }
      }
    }
  });

  const accountsToCreate = accounts.filter((account) => {
    const existsAccount = accountsFounded.find(
      (accountFounded) => accountFounded.id === account.id
    );
    return !existsAccount;
  });

  const accountsCreated = await Promise.all(
    accountsToCreate.map((accountToCreate) =>
      prismaClient.account.create({ data: accountToCreate })
    )
  );
  return new AccountMapper().toModels([...accountsCreated, ...accountsFounded]);
};
