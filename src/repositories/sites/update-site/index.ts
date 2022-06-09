import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateSiteDTO } from '@/dtos/sites/update-site.dto';

@Injectable()
export class UpdateSiteRepository
  implements IBaseRepository<UpdateSiteDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateSiteDTO): Promise<boolean> {
    const updated = await this.model.site.update({
      where: {
        id: where?.siteId
      },
      data
    });
    return !!updated;
  }
}
