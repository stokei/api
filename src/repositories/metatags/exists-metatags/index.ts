import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsMetatagsDTO } from '@/dtos/metatags/exists-metatags.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsMetatagsRepository
  implements IBaseRepository<ExistsMetatagsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsMetatagsDTO): Promise<boolean> {
    return (await this.model.metatag.count({ where })) > 0;
  }
}
