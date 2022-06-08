import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCartsItemsDTO } from '@/dtos/carts-items/exists-carts-items.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCartsItemsRepository
  implements IBaseRepository<ExistsCartsItemsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCartsItemsDTO): Promise<boolean> {
    return (await this.model.cartsItem.count({ where })) > 0;
  }
}
