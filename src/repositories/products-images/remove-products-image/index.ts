import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveProductsImageDTO } from '@/dtos/products-images/remove-products-image.dto';

@Injectable()
export class RemoveProductsImageRepository
  implements IBaseRepository<RemoveProductsImageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProductsImageDTO): Promise<boolean> {
    const removed = await this.model.productsImage.delete({
      where: {
        id: where?.productsImageId
      }
    });
    return !!removed;
  }
}
