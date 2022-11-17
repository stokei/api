import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AccountModel } from '@/models/account.model';
import { AppModel } from '@/models/app.model';

import { createAccounts } from './items/accounts/create-accounts';
import { createAppAdmins } from './items/app-admins/create-app-admins';
import { createAppInstructors } from './items/app-instructors/create-app-instructors';
import { createApps } from './items/apps/create-apps';
import { createCurrencies } from './items/currencies/create-currencies';
import { createLanguages } from './items/languages/create-languages';
import { createPlans } from './items/plans/create-plans';

const prismaClient = new PrismaClient();

const appendAppDependencies = async ({
  prismaClient,
  stokeiAdmin,
  apps
}: {
  apps: AppModel[];
  stokeiAdmin: AccountModel;
  prismaClient: PrismaClient;
}) =>
  Promise.all(
    apps.map(async (app) => {
      await createAppAdmins({
        prismaClient,
        app: app.id,
        admin: stokeiAdmin.id
      });
      await createAppInstructors({
        prismaClient,
        app: app.id,
        instructor: stokeiAdmin.id
      });
    })
  );

const initializeSeeds = async () => {
  const currencies = await createCurrencies({ prismaClient });
  const languages = await createLanguages({ prismaClient });
  const accounts = await createAccounts({ prismaClient });
  await createPlans({ prismaClient });
  const realCurrency = currencies.find((currency) => currency.id.match(/brl/i));
  const portugueseLanguage = languages.find((language) =>
    language.id.match(/pt-br/i)
  );
  const stokeiAdmin = accounts.find(
    (account) => account.email === 'admin@stokei.com'
  );
  const apps = await createApps({
    prismaClient,
    admin: stokeiAdmin.id,
    currency: realCurrency.id,
    language: portugueseLanguage.id
  });

  await appendAppDependencies({
    apps,
    stokeiAdmin,
    prismaClient
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
