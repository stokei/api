import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsCategoriesDTO } from '@/dtos/categories/exists-categories.dto';

@Injectable()
export class ExistsCategoriesRepository
  implements IBaseRepository<ExistsCategoriesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCategoriesDTO): Promise<boolean> {
    return (await this.model.category.count({ where })) > 0;
  }
}
