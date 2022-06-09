import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateProductsTagDTO } from '@/dtos/products-tags/update-products-tag.dto';

@Injectable()
export class UpdateProductsTagRepository
  implements IBaseRepository<UpdateProductsTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProductsTagDTO): Promise<boolean> {
    const updated = await this.model.productsTag.update({
      where: {
        id: where?.productsTagId
      },
      data
    });
    return !!updated;
  }
}
