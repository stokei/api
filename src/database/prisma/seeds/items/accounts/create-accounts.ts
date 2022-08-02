import {
  AccountRole,
  AccountStatus,
  Prisma,
  PrismaClient
} from '@prisma/client';
import { encryptPassword, generateSalt } from '@stokei/nestjs';

import { defaultAppId } from '@/constants/default-app-id';
import { PASSWORD_SECRET_KEY } from '@/environments';
import { AccountMapper } from '@/mappers/accounts';

const myAccounts = (): Prisma.AccountCreateManyInput[] => {
  const salt = generateSalt(PASSWORD_SECRET_KEY);
  const defaultPassword = encryptPassword('123456', salt, PASSWORD_SECRET_KEY);
  return [
    {
      id: 'stokei',
      firstname: 'Stokei',
      lastname: 'Admin',
      app: defaultAppId,
      status: AccountStatus.ACTIVE,
      email: 'admin@stokei.com',
      password: defaultPassword,
      salt,
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
