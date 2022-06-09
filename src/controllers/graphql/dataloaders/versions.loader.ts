import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllVersionsService } from '@/services/versions/find-all-versions';

@Injectable({ scope: Scope.REQUEST })
export class VersionsLoader {
  constructor(private readonly versionsService: FindAllVersionsService) {}

  readonly findByIds = new DataLoader(async (versionIds: string[]) => {
    const versions = await this.versionsService.execute({
      where: {
        AND: {
          ids: versionIds
        }
      }
    });
    const versionsMap = new Map(
      versions?.items?.map((version) => [version.id, version])
    );
    return versionIds.map((versionId) => versionsMap.get(versionId));
  });
}
