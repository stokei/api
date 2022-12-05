import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { defaultCurrencyId } from '@/constants/default-currency-id';
import { defaultLanguageId } from '@/constants/default-language-id';
import { CreateAppDTO } from '@/dtos/apps/create-app.dto';
import { AppModel } from '@/models/app.model';
import { CreateAppService } from '@/services/apps/create-app';
import { FindAllAppsService } from '@/services/apps/find-all-apps';

type AppDataDTO = CreateAppDTO;

@Injectable()
export class AppsSeeds implements IBaseService<any, Promise<AppModel[]>> {
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly findAllAppsService: FindAllAppsService
  ) {}

  async execute(): Promise<AppModel[]> {
    const appsData = this.createData();
    const appsFounded = await this.findAllAppsService.execute({
      where: {
        AND: {
          ids: [defaultAppId]
        }
      }
    });
    let appsToCreate = appsData;
    if (appsFounded?.items?.length > 0) {
      appsToCreate = appsData?.filter((app) => {
        const existsLanguage = appsFounded?.items?.find(
          (appFounded) => appFounded.email === app.email
        );
        return !existsLanguage;
      });
    }
    const prismaClient = new PrismaClient();
    const appsCreated = await Promise.all(
      appsToCreate?.map(async (appData) => {
        const app = await this.createAppService.execute(appData);
        return app;
      })
    );
    prismaClient.$disconnect();
    return [...appsFounded?.items, ...appsCreated];
  }

  private createData(): AppDataDTO[] {
    return [
      {
        id: splitServiceId(defaultAppId)?.id,
        name: 'Stokei',
        slug: 'stokei',
        parent: defaultAccountId,
        email: 'contato@stokei.com',
        currency: defaultCurrencyId,
        language: defaultLanguageId,
        createdBy: defaultAccountId
      }
    ];
  }
}
