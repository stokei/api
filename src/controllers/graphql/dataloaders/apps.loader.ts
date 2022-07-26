import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllAppsService } from '@/services/apps/find-all-apps';

@Injectable({ scope: Scope.REQUEST })
export class AppsLoader {
  constructor(private readonly appsService: FindAllAppsService) {}

  readonly findByIds = new DataLoader(async (appIds: string[]) => {
    const apps = await this.appsService.execute({
      where: {
        AND: {
          ids: appIds
        }
      }
    });
    const appsMap = new Map(apps?.items?.map((app) => [app.id, app]));
    return appIds.map((appId) => appsMap.get(appId));
  });
}
