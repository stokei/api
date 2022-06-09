import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ColorMapper } from '@/mappers/colors';
import { ColorModel } from '@/models/color.model';

@Injectable()
export class FindColorByIdRepository
  implements IBaseRepository<string, Promise<ColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ColorModel> {
    return new ColorMapper().toModel(
      await this.model.color.findUnique({
        where: { id }
      })
    );
  }
}
