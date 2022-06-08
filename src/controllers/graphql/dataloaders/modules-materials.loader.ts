import { Injectable, Scope } from '@nestjs/common';
import { FindAllModulesMaterialsService } from '@/services/modules-materials/find-all-modules-materials';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ModulesMaterialsLoader {
  constructor(
    private readonly modulesMaterialsService: FindAllModulesMaterialsService
  ) {}

  readonly findByIds = new DataLoader(async (modulesMaterialIds: string[]) => {
    const modulesMaterials = await this.modulesMaterialsService.execute({
      where: {
        AND: {
          ids: modulesMaterialIds
        }
      }
    });
    const modulesMaterialsMap = new Map(
      modulesMaterials?.items?.map((modulesMaterial) => [
        modulesMaterial.id,
        modulesMaterial
      ])
    );
    return modulesMaterialIds.map((modulesMaterialId) =>
      modulesMaterialsMap.get(modulesMaterialId)
    );
  });
}
