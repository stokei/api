import { Injectable, Scope } from '@nestjs/common';
import { FindAllModulesService } from '@/services/modules/find-all-modules';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class ModulesLoader {
  constructor(private readonly modulesService: FindAllModulesService) {}

  readonly findByIds = new DataLoader(async (moduleIds: string[]) => {
    const modules = await this.modulesService.execute({
      where: {
        AND: {
          ids: moduleIds
        }
      }
    });
    const modulesMap = new Map(
      modules?.items?.map((module) => [module.id, module])
    );
    return moduleIds.map((moduleId) => modulesMap.get(moduleId));
  });
}
