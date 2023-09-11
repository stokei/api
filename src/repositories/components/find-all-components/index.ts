import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllComponentsDTO } from '@/dtos/components/find-all-components.dto';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class FindAllComponentsRepository
  implements IBaseRepository<FindAllComponentsDTO, Promise<ComponentModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllComponentsDTO): Promise<ComponentModel[]> {
    const componentMapper = new ComponentMapper();
    return componentMapper.toModels(
      await this.model.component.findMany(componentMapper.toFindAllPrisma(data))
    );
  }
}
