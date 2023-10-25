import { Injectable, Scope } from '@nestjs/common';
import { PaginationMapper } from '@stokei/nestjs';
import DataLoader from 'dataloader';

import { AccessModel } from '@/models/access.model';
import { FindAllAccessesService } from '@/services/accesses/find-all-accesses';

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

  readonly findByParentIds = new DataLoader(
    async (accessParentIds: string[]) => {
      const accesses = await this.accessesService.execute({
        where: {
          AND: {
            parent: {
              equals: accessParentIds
            }
          }
        }
      });
      return accessParentIds.map((parentId) => {
        const items = accesses?.items?.filter(
          (access) => access.parent === parentId
        );
        return new PaginationMapper<AccessModel>().toPaginationList({
          totalCount: items?.length || 0,
          items
        });
      });
    }
  );
}
