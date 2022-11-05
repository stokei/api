import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllAppAdminsService } from '@/services/app-admins/find-all-app-admins';

@Injectable({ scope: Scope.REQUEST })
export class AppAdminsLoader {
  constructor(private readonly appAdminsService: FindAllAppAdminsService) {}

  readonly findByIds = new DataLoader(async (appAdminIds: string[]) => {
    const appAdmins = await this.appAdminsService.execute({
      where: {
        AND: {
          ids: appAdminIds
        }
      }
    });
    const appAdminsMap = new Map(
      appAdmins?.items?.map((appAdmin) => [appAdmin.id, appAdmin])
    );
    return appAdminIds.map((appAdminId) => appAdminsMap.get(appAdminId));
  });
}
