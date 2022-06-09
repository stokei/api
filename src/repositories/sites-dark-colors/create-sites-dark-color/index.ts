import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/create-sites-dark-color.dto';
import { SitesDarkColorMapper } from '@/mappers/sites-dark-colors';
import { SitesDarkColorModel } from '@/models/sites-dark-color.model';

@Injectable()
export class CreateSitesDarkColorRepository
  implements
    IBaseRepository<CreateSitesDarkColorDTO, Promise<SitesDarkColorModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateSitesDarkColorDTO): Promise<SitesDarkColorModel> {
    return new SitesDarkColorMapper().toModel(
      await this.model.sitesDarkColor.create({ data })
    );
  }
}
