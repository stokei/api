import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateComponentDTO } from '@/dtos/components/create-component.dto';

@Injectable()
export class CreateMultipleComponentsRepository
  implements IBaseRepository<CreateComponentDTO[], Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateComponentDTO[]): Promise<boolean> {
    const response = await this.model.component.createMany({ data });
    return response?.count === data.length;
  }
}
