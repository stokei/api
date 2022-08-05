import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { createAccounts } from './items/accounts/create-accounts';
import { createApps } from './items/apps/create-apps';
import { createCurrencies } from './items/currencies/create-currencies';
import { createLanguages } from './items/languages/create-languages';

const prismaClient = new PrismaClient();

const initializeSeeds = async () => {
  const currencies = await createCurrencies({ prismaClient });
  const languages = await createLanguages({ prismaClient });
  const accounts = await createAccounts({ prismaClient });
  const realCurrency = currencies.find((currency) => currency.id.match(/brl/i));
  const portugueseLanguage = languages.find((language) =>
    language.id.match(/pt-br/i)
  );
  const stokeiAdmin = accounts.find(
    (account) => account.email === 'admin@stokei.com'
  );
  await createApps({
    prismaClient,
    admin: stokeiAdmin.id,
    currency: realCurrency.id,
    language: portugueseLanguage.id
  });
};

initializeSeeds()
  .then(() => {
    Logger.log('Prisma seeds run successfully');
  })
  .catch((error) => {
    Logger.error(error);
    process.exit(1);
  })
  .finally(() => {
    prismaClient.$disconnect();
  });