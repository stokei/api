import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { SitesDarkColorMapper } from '@/mappers/sites-dark-colors';
import { CreateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/create-sites-dark-color.dto';
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
