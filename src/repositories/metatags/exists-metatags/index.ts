import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsMetatagsDTO } from '@/dtos/metatags/exists-metatags.dto';

@Injectable()
export class ExistsMetatagsRepository
  implements IBaseRepository<ExistsMetatagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsMetatagsDTO): Promise<boolean> {
    return (await this.model.metatag.count({ where })) > 0;
  }
}
