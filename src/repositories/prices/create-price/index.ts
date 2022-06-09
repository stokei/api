import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePriceDTO } from '@/dtos/prices/create-price.dto';
import { PriceMapper } from '@/mappers/prices';
import { PriceModel } from '@/models/price.model';

@Injectable()
export class CreatePriceRepository
  implements IBaseRepository<CreatePriceDTO, Promise<PriceModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePriceDTO): Promise<PriceModel> {
    return new PriceMapper().toModel(await this.model.price.create({ data }));
  }
}
