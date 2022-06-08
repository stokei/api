import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsProductsTagsDTO } from '@/dtos/products-tags/exists-products-tags.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsProductsTagsRepository
  implements IBaseRepository<ExistsProductsTagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProductsTagsDTO): Promise<boolean> {
    return (await this.model.productsTag.count({ where })) > 0;
  }
}
