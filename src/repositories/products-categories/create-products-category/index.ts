import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ProductsCategoryMapper } from '@/mappers/products-categories';
import { CreateProductsCategoryDTO } from '@/dtos/products-categories/create-products-category.dto';
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
