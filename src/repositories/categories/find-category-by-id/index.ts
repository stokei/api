import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CategoryMapper } from '@/mappers/categories';
import { CategoryModel } from '@/models/category.model';

@Injectable()
export class FindCategoryByIdRepository
  implements IBaseRepository<string, Promise<CategoryModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<CategoryModel> {
    return new CategoryMapper().toModel(
      await this.model.category.findUnique({
        where: { id }
      })
    );
  }
}
