import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsQuestionsDTO } from '@/dtos/questions/exists-questions.dto';

@Injectable()
export class ExistsQuestionsRepository
  implements IBaseRepository<ExistsQuestionsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsQuestionsDTO): Promise<boolean> {
    return (await this.model.question.count({ where })) > 0;
  }
}
