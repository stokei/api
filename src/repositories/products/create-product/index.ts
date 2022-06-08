import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ProductMapper } from '@/mappers/products';
import { CreateProductDTO } from '@/dtos/products/create-product.dto';
import { ProductModel } from '@/models/product.model';

@Injectable()
export class CreateProductRepository
  implements IBaseRepository<CreateProductDTO, Promise<ProductModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateProductDTO): Promise<ProductModel> {
    return new ProductMapper().toModel(
      await this.model.product.create({ data })
    );
  }
}
