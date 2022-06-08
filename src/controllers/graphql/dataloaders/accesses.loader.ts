import { Injectable, Scope } from '@nestjs/common';
import { FindAllAccessesService } from '@/services/accesses/find-all-accesses';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class AccessesLoader {
  constructor(private readonly accessesService: FindAllAccessesService) {}

  readonly findByIds = new DataLoader(async (accessIds: string[]) => {
    const accesses = await this.accessesService.execute({
      where: {
        AND: {
          ids: accessIds
        }
      }
    });
    const accessesMap = new Map(
      accesses?.items?.map((access) => [access.id, access])
    );
    return accessIds.map((accessId) => accessesMap.get(accessId));
  });
}
