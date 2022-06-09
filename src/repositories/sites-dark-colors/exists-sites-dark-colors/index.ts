import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsSitesDarkColorsDTO } from '@/dtos/sites-dark-colors/exists-sites-dark-colors.dto';

@Injectable()
export class ExistsSitesDarkColorsRepository
  implements IBaseRepository<ExistsSitesDarkColorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsSitesDarkColorsDTO): Promise<boolean> {
    return (await this.model.sitesDarkColor.count({ where })) > 0;
  }
}
