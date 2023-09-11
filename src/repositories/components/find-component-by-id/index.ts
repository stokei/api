import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class FindComponentByIdRepository
  implements IBaseRepository<string, Promise<ComponentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ComponentModel> {
    return new ComponentMapper().toModel(
      await this.model.component.findUnique({
        where: { id }
      })
    );
  }
}
