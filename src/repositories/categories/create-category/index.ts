import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCategoryDTO } from '@/dtos/categories/create-category.dto';
import { CategoryMapper } from '@/mappers/categories';
import { CategoryModel } from '@/models/category.model';

@Injectable()
export class CreateCategoryRepository
  implements IBaseRepository<CreateCategoryDTO, Promise<CategoryModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCategoryDTO): Promise<CategoryModel> {
    return new CategoryMapper().toModel(
      await this.model.category.create({ data })
    );
  }
}
