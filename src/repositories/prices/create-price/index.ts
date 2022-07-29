import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePriceRepositoryDTO } from '@/dtos/prices/create-price-repository.dto';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class CreatePriceRepository
  implements IBaseRepository<CreatePriceRepositoryDTO, Promise<PriceModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePriceRepositoryDTO): Promise<PriceModel> {
    return new PriceMapper().toModel(await this.model.price.create({ data }));
  }
}
