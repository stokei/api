import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsPagesDTO } from '@/dtos/pages/exists-pages.dto';

@Injectable()
export class ExistsPagesRepository
  implements IBaseRepository<ExistsPagesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPagesDTO): Promise<boolean> {
    return (await this.model.page.count({ where })) > 0;
  }
}
