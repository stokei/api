import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateComponentRepositoryDTO } from '@/dtos/components/create-component-repository.dto';
import { ComponentMapper } from '@/mappers/components';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class CreateComponentRepository
  implements
    IBaseRepository<CreateComponentRepositoryDTO, Promise<ComponentModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateComponentRepositoryDTO): Promise<ComponentModel> {
    return new ComponentMapper().toModel(
      await this.model.component.create({ data })
    );
  }
}
