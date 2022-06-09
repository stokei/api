import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProductsCategoryDTO } from '@/dtos/products-categories/create-products-category.dto';
import { ProductsCategoryMapper } from '@/mappers/products-categories';
import { ProductsCategoryModel } from '@/models/products-category.model';

@Injectable()
export class CreateProductsCategoryRepository
  implements
    IBaseRepository<CreateProductsCategoryDTO, Promise<ProductsCategoryModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: CreateProductsCategoryDTO
  ): Promise<ProductsCategoryModel> {
    return new ProductsCategoryMapper().toModel(
      await this.model.productsCategory.create({ data })
    );
  }
}
