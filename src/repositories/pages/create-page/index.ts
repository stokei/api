import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePageRepositoryDTO } from '@/dtos/pages/create-page-repository.dto';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';

@Injectable()
export class CreatePageRepository
  implements IBaseRepository<CreatePageRepositoryDTO, Promise<PageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePageRepositoryDTO): Promise<PageModel> {
    return new PageMapper().toModel(await this.model.page.create({ data }));
  }
}
