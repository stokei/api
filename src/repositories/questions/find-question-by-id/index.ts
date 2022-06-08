import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { QuestionMapper } from '@/mappers/questions';
import { QuestionModel } from '@/models/question.model';

@Injectable()
export class FindQuestionByIdRepository
  implements IBaseRepository<string, Promise<QuestionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<QuestionModel> {
    return new QuestionMapper().toModel(
      await this.model.question.findUnique({
        where: { id }
      })
    );
  }
}
