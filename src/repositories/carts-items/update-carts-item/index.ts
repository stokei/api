import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCartsItemDTO } from '@/dtos/carts-items/update-carts-item.dto';

@Injectable()
export class UpdateCartsItemRepository
  implements IBaseRepository<UpdateCartsItemDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCartsItemDTO): Promise<boolean> {
    const updated = await this.model.cartsItem.update({
      where: {
        id: where?.cartsItemId
      },
      data
    });
    return !!updated;
  }
}
