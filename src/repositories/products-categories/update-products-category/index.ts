import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateProductsCategoryDTO } from '@/dtos/products-categories/update-products-category.dto';

@Injectable()
export class UpdateProductsCategoryRepository
  implements IBaseRepository<UpdateProductsCategoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProductsCategoryDTO): Promise<boolean> {
    const updated = await this.model.productsCategory.update({
      where: {
        id: where?.productsCategoryId
      },
      data
    });
    return !!updated;
  }
}
