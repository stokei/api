import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsColorsDTO } from '@/dtos/colors/exists-colors.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsColorsRepository
  implements IBaseRepository<ExistsColorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsColorsDTO): Promise<boolean> {
    return (await this.model.color.count({ where })) > 0;
  }
}
