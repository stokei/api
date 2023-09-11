import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateComponentDTO } from '@/dtos/components/create-component.dto';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class CreateComponentRepository
  implements IBaseRepository<CreateComponentDTO, Promise<ComponentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateComponentDTO): Promise<ComponentModel> {
    return new ComponentMapper().toModel(
      await this.model.component.create({ data })
    );
  }
}
