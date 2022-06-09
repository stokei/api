import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateProductsImageDTO } from '@/dtos/products-images/create-products-image.dto';
import { ProductsImageMapper } from '@/mappers/products-images';
import { ProductsImageModel } from '@/models/products-image.model';

@Injectable()
export class CreateProductsImageRepository
  implements
    IBaseRepository<CreateProductsImageDTO, Promise<ProductsImageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProductsImageDTO): Promise<ProductsImageModel> {
    return new ProductsImageMapper().toModel(
      await this.model.productsImage.create({ data })
    );
  }
}
