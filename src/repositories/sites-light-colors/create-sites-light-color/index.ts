import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSitesLightColorDTO } from '@/dtos/sites-light-colors/create-sites-light-color.dto';
import { SitesLightColorMapper } from '@/mappers/sites-light-colors';
import { SitesLightColorModel } from '@/models/sites-light-color.model';

@Injectable()
export class CreateSitesLightColorRepository
  implements
    IBaseRepository<CreateSitesLightColorDTO, Promise<SitesLightColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateSitesLightColorDTO): Promise<SitesLightColorModel> {
    return new SitesLightColorMapper().toModel(
      await this.model.sitesLightColor.create({ data })
    );
  }
}
