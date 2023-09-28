import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindPageBySlugAndParentDTO } from '@/dtos/pages/find-page-by-slug-and-parent.dto';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';

@Injectable()
export class FindPageBySlugAndParentRepository
  implements IBaseRepository<FindPageBySlugAndParentDTO, Promise<PageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindPageBySlugAndParentDTO): Promise<PageModel> {
    return new PageMapper().toModel(
      await this.model.page.findFirst({
        where: {
          parent: data.parent,
          slug: data.slug
        }
      })
    );
  }
}
