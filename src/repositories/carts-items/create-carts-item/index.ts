import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateCartsItemDTO } from '@/dtos/carts-items/create-carts-item.dto';
import { CartsItemMapper } from '@/mappers/carts-items';
import { CartsItemModel } from '@/models/carts-item.model';

@Injectable()
export class CreateCartsItemRepository
  implements IBaseRepository<CreateCartsItemDTO, Promise<CartsItemModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCartsItemDTO): Promise<CartsItemModel> {
    return new CartsItemMapper().toModel(
      await this.model.cartsItem.create({ data })
    );
  }
}
