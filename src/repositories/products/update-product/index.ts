import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateProductDTO } from '@/dtos/products/update-product.dto';

@Injectable()
export class UpdateProductRepository
  implements IBaseRepository<UpdateProductDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProductDTO): Promise<boolean> {
    const updated = await this.model.product.update({
      where: {
        id: where?.product
      },
      data
    });
    return !!updated;
  }
}
