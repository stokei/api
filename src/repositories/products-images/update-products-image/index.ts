import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateProductsImageDTO } from '@/dtos/products-images/update-products-image.dto';

@Injectable()
export class UpdateProductsImageRepository
  implements IBaseRepository<UpdateProductsImageDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateProductsImageDTO): Promise<boolean> {
    const updated = await this.model.productsImage.update({
      where: {
        id: where?.productsImageId
      },
      data
    });
    return !!updated;
  }
}
