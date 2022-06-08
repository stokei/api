import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveProductsCategoryDTO } from '@/dtos/products-categories/remove-products-category.dto';

@Injectable()
export class RemoveProductsCategoryRepository
  implements IBaseRepository<RemoveProductsCategoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveProductsCategoryDTO): Promise<boolean> {
    const removed = await this.model.productsCategory.delete({
      where: {
        id: where?.productsCategoryId
      }
    });
    return !!removed;
  }
}
