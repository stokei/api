import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsProductsDTO } from '@/dtos/products/exists-products.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsProductsRepository
  implements IBaseRepository<ExistsProductsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProductsDTO): Promise<boolean> {
    return (await this.model.product.count({ where })) > 0;
  }
}
