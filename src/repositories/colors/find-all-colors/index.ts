import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllColorsDTO } from '@/dtos/colors/find-all-colors.dto';
import { ColorMapper } from '@/mappers/colors';
import { ColorModel } from '@/models/color.model';

@Injectable()
export class FindAllColorsRepository
  implements IBaseRepository<FindAllColorsDTO, Promise<ColorModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllColorsDTO): Promise<ColorModel[]> {
    const colorMapper = new ColorMapper();
    return colorMapper.toModels(
      await this.model.color.findMany(colorMapper.toFindAllPrisma(data))
    );
  }
}
