import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';

import { FindAllComponentsService } from '@/services/components/find-all-components';
import { FindAllComponentsByParentIdsService } from '@/services/components/find-all-components-by-parent-ids';

@Injectable({ scope: Scope.REQUEST })
export class ComponentsLoader {
  constructor(
    private readonly componentsService: FindAllComponentsService,
    private readonly findAllComponentsByParentIdsService: FindAllComponentsByParentIdsService
  ) {}

  readonly findByIds = new DataLoader(async (componentIds: string[]) => {
    const components = await this.componentsService.execute({
      where: {
        AND: {
          ids: componentIds
        }
      }
    });
    const componentsMap = new Map(
      components?.items?.map((component) => [component.id, component])
    );
    return componentIds.map((componentId) => componentsMap.get(componentId));
  });

  readonly findByParentIds = new DataLoader(
    async (componentParentIds: string[]) => {
      const components =
        await this.findAllComponentsByParentIdsService.execute(
          componentParentIds
        );
      return componentParentIds.map((parentId) =>
        components.filter((component) => component.parent === parentId)
      );
    }
  );
}
