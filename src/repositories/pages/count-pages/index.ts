import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountPagesDTO } from '@/dtos/pages/count-pages.dto';
import { PageMapper } from '@/mappers/pages';

@Injectable()
export class CountPagesRepository
  implements IBaseRepository<CountPagesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountPagesDTO): Promise<number> {
    const pageMapper = new PageMapper();
    return await this.model.page.count({
      where: pageMapper.toWhereFindAllPrisma(where)
    });
  }
}
