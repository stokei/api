import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';

@Injectable()
export class FindPageByIdRepository
  implements IBaseRepository<string, Promise<PageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<PageModel> {
    return new PageMapper().toModel(
      await this.model.page.findUnique({
        where: { id }
      })
    );
  }
}
