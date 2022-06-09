import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreatePageDTO } from '@/dtos/pages/create-page.dto';
import { PageMapper } from '@/mappers/pages';
import { PageModel } from '@/models/page.model';

@Injectable()
export class CreatePageRepository
  implements IBaseRepository<CreatePageDTO, Promise<PageModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreatePageDTO): Promise<PageModel> {
    return new PageMapper().toModel(await this.model.page.create({ data }));
  }
}
