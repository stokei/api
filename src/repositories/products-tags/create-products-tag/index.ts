import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ProductsTagMapper } from '@/mappers/products-tags';
import { CreateProductsTagDTO } from '@/dtos/products-tags/create-products-tag.dto';
import { ProductsTagModel } from '@/models/products-tag.model';

@Injectable()
export class CreateProductsTagRepository
  implements IBaseRepository<CreateProductsTagDTO, Promise<ProductsTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProductsTagDTO): Promise<ProductsTagModel> {
    return new ProductsTagMapper().toModel(
      await this.model.productsTag.create({ data })
    );
  }
}
