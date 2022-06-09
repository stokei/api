import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsColorsDTO } from '@/dtos/colors/exists-colors.dto';

@Injectable()
export class ExistsColorsRepository
  implements IBaseRepository<ExistsColorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsColorsDTO): Promise<boolean> {
    return (await this.model.color.count({ where })) > 0;
  }
}
