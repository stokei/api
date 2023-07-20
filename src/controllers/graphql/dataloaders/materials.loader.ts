import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllMaterialsService } from '@/services/materials/find-all-materials';

@Injectable({ scope: Scope.REQUEST })
export class MaterialsLoader {
  constructor(private readonly materialsService: FindAllMaterialsService) {}

  readonly findByIds = new DataLoader(async (materialIds: string[]) => {
    const materials = await this.materialsService.execute({
      where: {
        AND: {
          ids: materialIds
        }
      }
    });
    const materialsMap = new Map(
      materials?.items?.map((material) => [material.id, material])
    );
    return materialIds.map((materialId) => materialsMap.get(materialId));
  });
}
