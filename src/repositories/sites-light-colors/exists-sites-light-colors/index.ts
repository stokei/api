import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsSitesLightColorsDTO } from '@/dtos/sites-light-colors/exists-sites-light-colors.dto';

@Injectable()
export class ExistsSitesLightColorsRepository
  implements IBaseRepository<ExistsSitesLightColorsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsSitesLightColorsDTO): Promise<boolean> {
    return (await this.model.sitesLightColor.count({ where })) > 0;
  }
}
