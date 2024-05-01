import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountComponentsDTO } from '@/dtos/components/count-components.dto';
import { ComponentMapper } from '@/mappers/components';

@Injectable()
export class CountComponentsRepository
  implements IBaseRepository<CountComponentsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountComponentsDTO): Promise<number> {
    const componentMapper = new ComponentMapper();
    return await this.model.component.count({
      where: componentMapper.toWhereFindAllPrisma(where)
    });
  }
}
