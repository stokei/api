import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllComponentsWithComponentsChildrenDTO } from '@/dtos/components/find-all-components-with-components-children.dto';
import { ComponentEntity } from '@/entities';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class FindAllComponentsWithComponentsChildrenRepository
  implements
    IBaseRepository<
      FindAllComponentsWithComponentsChildrenDTO,
      Promise<ComponentModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllComponentsWithComponentsChildrenDTO
  ): Promise<ComponentModel[]> {
    const componentMapper = new ComponentMapper();
    const response: ComponentEntity[] = await this.model.$queryRaw`
      WITH RECURSIVE recursive_components_table AS
      (
        SELECT components.* FROM components 
        WHERE components.parent = ${data.parent} AND
          components.app = ${data.app}
        UNION ALL
        SELECT components.* FROM components 
        INNER JOIN recursive_components_table 
        ON components.parent = CONCAT('component_', recursive_components_table.id)
      ) SELECT * FROM recursive_components_table 
        ORDER BY recursive_components_table.parent ASC
    `;
    return componentMapper.toModels(response);
  }
}
