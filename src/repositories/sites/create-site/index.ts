import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateSiteDTO } from '@/dtos/sites/create-site.dto';
import { SiteMapper } from '@/mappers/sites';
import { SiteModel } from '@/models/site.model';

@Injectable()
export class CreateSiteRepository
  implements IBaseRepository<CreateSiteDTO, Promise<SiteModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateSiteDTO): Promise<SiteModel> {
    return new SiteMapper().toModel(await this.model.site.create({ data }));
  }
}
