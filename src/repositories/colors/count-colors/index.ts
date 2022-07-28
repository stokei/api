import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountColorsDTO } from '@/dtos/colors/count-colors.dto';
import { ColorMapper } from '@/mappers/colors';

@Injectable()
export class CountColorsRepository
  implements IBaseRepository<CountColorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountColorsDTO): Promise<number> {
    const colorMapper = new ColorMapper();
    return await this.model.color.count({
      where: colorMapper.toWhereFindAllPrisma(where)
    });
  }
}
