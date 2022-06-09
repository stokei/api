import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateQuestionDTO } from '@/dtos/questions/create-question.dto';
import { QuestionMapper } from '@/mappers/questions';
import { QuestionModel } from '@/models/question.model';

@Injectable()
export class CreateQuestionRepository
  implements IBaseRepository<CreateQuestionDTO, Promise<QuestionModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateQuestionDTO): Promise<QuestionModel> {
    return new QuestionMapper().toModel(
      await this.model.question.create({ data })
    );
  }
}
