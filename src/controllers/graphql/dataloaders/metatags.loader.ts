import { Injectable, Scope } from '@nestjs/common';
import { FindAllMetatagsService } from '@/services/metatags/find-all-metatags';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class MetatagsLoader {
  constructor(private readonly metatagsService: FindAllMetatagsService) {}

  readonly findByIds = new DataLoader(async (metatagIds: string[]) => {
    const metatags = await this.metatagsService.execute({
      where: {
        AND: {
          ids: metatagIds
        }
      }
    });
    const metatagsMap = new Map(
      metatags?.items?.map((metatag) => [metatag.id, metatag])
    );
    return metatagIds.map((metatagId) => metatagsMap.get(metatagId));
  });
}
