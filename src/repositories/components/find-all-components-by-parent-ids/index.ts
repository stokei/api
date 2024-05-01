import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class FindAllComponentsByParentIdsRepository
  implements IBaseRepository<string[], Promise<ComponentModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(parentIds: string[]): Promise<ComponentModel[]> {
    const componentMapper = new ComponentMapper();
    return componentMapper.toModels(
      await this.model.component.findMany({
        where: {
          AND: {
            parent: {
              in: parentIds
            }
          }
        }
      })
    );
  }
}
