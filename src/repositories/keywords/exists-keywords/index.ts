import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsKeywordsDTO } from '@/dtos/keywords/exists-keywords.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsKeywordsRepository
  implements IBaseRepository<ExistsKeywordsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsKeywordsDTO): Promise<boolean> {
    return (await this.model.keyword.count({ where })) > 0;
  }
}
