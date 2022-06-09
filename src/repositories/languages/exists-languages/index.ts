import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsLanguagesDTO } from '@/dtos/languages/exists-languages.dto';

@Injectable()
export class ExistsLanguagesRepository
  implements IBaseRepository<ExistsLanguagesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsLanguagesDTO): Promise<boolean> {
    return (await this.model.language.count({ where })) > 0;
  }
}
