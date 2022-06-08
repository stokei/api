import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { CartMapper } from '@/mappers/carts';
import { CreateCartDTO } from '@/dtos/carts/create-cart.dto';
import { CartModel } from '@/models/cart.model';

@Injectable()
export class CreateCartRepository
  implements IBaseRepository<CreateCartDTO, Promise<CartModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateCartDTO): Promise<CartModel> {
    return new CartMapper().toModel(await this.model.cart.create({ data }));
  }
}
