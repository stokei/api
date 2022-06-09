import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsProductsImagesDTO } from '@/dtos/products-images/exists-products-images.dto';

@Injectable()
export class ExistsProductsImagesRepository
  implements IBaseRepository<ExistsProductsImagesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProductsImagesDTO): Promise<boolean> {
    return (await this.model.productsImage.count({ where })) > 0;
  }
}
