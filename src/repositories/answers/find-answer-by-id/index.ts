import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { AnswerMapper } from '@/mappers/answers';
import { AnswerModel } from '@/models/answer.model';

@Injectable()
export class FindAnswerByIdRepository
  implements IBaseRepository<string, Promise<AnswerModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AnswerModel> {
    return new AnswerMapper().toModel(
      await this.model.answer.findUnique({
        where: { id }
      })
    );
  }
}
