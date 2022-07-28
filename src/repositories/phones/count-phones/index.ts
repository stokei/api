import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPhonesDTO } from '@/dtos/phones/count-phones.dto';
import { PhoneMapper } from '@/mappers/phones';

@Injectable()
export class CountPhonesRepository
  implements IBaseRepository<CountPhonesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPhonesDTO): Promise<number> {
    const phoneMapper = new PhoneMapper();
    return await this.model.phone.count({
      where: phoneMapper.toWhereFindAllPrisma(where)
    });
  }
}
