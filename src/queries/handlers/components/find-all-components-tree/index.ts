import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { DataNotFoundException } from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { FindAllComponentsTreeQuery } from '@/queries/implements/components/find-all-components-tree.query';
import { FindAllComponentsWithComponentsChildrenService } from '@/services/components/find-all-components-with-components-children';

@QueryHandler(FindAllComponentsTreeQuery)
export class FindAllComponentsTreeQueryHandler
  implements IQueryHandler<FindAllComponentsTreeQuery>
{
  constructor(
    private readonly findAllComponentsWithComponentsChildrenService: FindAllComponentsWithComponentsChildrenService
  ) {}

  /**
   *  Criar order do component
   */

  async execute(query: FindAllComponentsTreeQuery): Promise<ComponentModel[]> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const data = this.cleanData(query);
    const allComponents =
      await this.findAllComponentsWithComponentsChildrenService.execute(data);

    const getComponentTree = (component: ComponentModel) => {
      const components = this.sortComponentByOrder(
        allComponents?.filter(
          (currentComponent) => currentComponent.parent === component.id
        )
      );
      let componentsChildren = [];
      if (!!components?.length) {
        componentsChildren = components?.map((component) =>
          getComponentTree(component)
        );
      }
      return new ComponentModel({
        ...component,
        components: componentsChildren
      });
    };

    const componentsWithChildren = this.sortComponentByOrder(
      allComponents
        ?.filter((component) => component.parent === data.parent)
        ?.map((component) => getComponentTree(component))
    );
    return componentsWithChildren;
  }

  private cleanData(
    query: FindAllComponentsTreeQuery
  ): FindAllComponentsTreeQuery {
    return cleanObject({
      app: cleanValue(query?.app),
      parent: cleanValue(query?.parent)
    });
  }

  private sortComponentByOrder(components: ComponentModel[]) {
    return components?.sort(
      (componentA, componentB) => componentA?.order - componentB?.order
    );
  }
}
