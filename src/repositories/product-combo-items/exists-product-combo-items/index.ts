import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsProductComboItemsDTO } from '@/dtos/product-combo-items/exists-product-combo-items.dto';

@Injectable()
export class ExistsProductComboItemsRepository
  implements IBaseRepository<ExistsProductComboItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsProductComboItemsDTO): Promise<boolean> {
    return (await this.model.productComboItem.count({ where })) > 0;
  }
}
