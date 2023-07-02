import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { defaultCurrencyId } from '@/constants/default-currency-id';
import { defaultLanguageId } from '@/constants/default-language-id';
import { CreateAppDTO } from '@/dtos/apps/create-app.dto';
import { CreateAppService } from '@/services/apps/create-app';
import { FindAllAppsService } from '@/services/apps/find-all-apps';

import { BaseSeeds } from '../base-seeds';

type AppDataDTO = CreateAppDTO;

@Injectable()
export class AppsSeeds
  extends BaseSeeds
  implements IBaseService<any, Promise<void>>
{
  constructor(
    private readonly createAppService: CreateAppService,
    private readonly findAllAppsService: FindAllAppsService
  ) {
    super();
  }

  async execute(): Promise<void> {
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

    appsToCreate?.forEach(async (appData) => {
      const app = await this.createAppService.execute(appData);
      return app;
    });
  }

  private createData(): AppDataDTO[] {
    return [
      {
        id: splitServiceId(defaultAppId)?.id,
        name: 'Stokei',
        slug: 'stokei',
        parent: defaultAccountId,
        paymentMethod: null,
        email: 'contato@stokei.com',
        currency: defaultCurrencyId,
        language: defaultLanguageId,
        createdBy: defaultAccountId
      }
    ];
  }
}
