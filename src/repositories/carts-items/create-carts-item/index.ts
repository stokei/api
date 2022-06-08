import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CartsItemMapper } from '@/mappers/carts-items';
import { CreateCartsItemDTO } from '@/dtos/carts-items/create-carts-item.dto';
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
