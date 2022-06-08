import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class FindPriceByIdRepository
  implements IBaseRepository<string, Promise<PriceModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PriceModel> {
    return new PriceMapper().toModel(
      await this.model.price.findUnique({
        where: { id }
      })
    );
  }
}
