import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllCatalogsService } from '@/services/catalogs/find-all-catalogs';

@Injectable({ scope: Scope.REQUEST })
export class CatalogsLoader {
  constructor(private readonly catalogsService: FindAllCatalogsService) {}

  readonly findByIds = new DataLoader(async (catalogIds: string[]) => {
    const catalogs = await this.catalogsService.execute({
      where: {
        AND: {
          ids: catalogIds
        }
      }
    });
    const catalogsMap = new Map(
      catalogs?.items?.map((catalog) => [catalog.id, catalog])
    );
    return catalogIds.map((catalogId) => catalogsMap.get(catalogId));
  });
}
