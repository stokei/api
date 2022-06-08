import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCartsDTO } from '@/dtos/carts/exists-carts.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCartsRepository
  implements IBaseRepository<ExistsCartsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCartsDTO): Promise<boolean> {
    return (await this.model.cart.count({ where })) > 0;
  }
}
