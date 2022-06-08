import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsQuestionsDTO } from '@/dtos/questions/exists-questions.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsQuestionsRepository
  implements IBaseRepository<ExistsQuestionsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsQuestionsDTO): Promise<boolean> {
    return (await this.model.question.count({ where })) > 0;
  }
}
