import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllPagesDTO } from '@/dtos/pages/find-all-pages.dto';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';

@Injectable()
export class FindAllPagesRepository
  implements IBaseRepository<FindAllPagesDTO, Promise<PageModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllPagesDTO): Promise<PageModel[]> {
    const pageMapper = new PageMapper();
    return pageMapper.toModels(
      await this.model.page.findMany(pageMapper.toFindAllPrisma(data))
    );
  }
}
