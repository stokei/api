import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAnswerDTO } from '@/dtos/answers/create-answer.dto';
import { AnswerMapper } from '@/mappers/answers';
import { AnswerModel } from '@/models/answer.model';

@Injectable()
export class CreateAnswerRepository
  implements IBaseRepository<CreateAnswerDTO, Promise<AnswerModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAnswerDTO): Promise<AnswerModel> {
    return new AnswerMapper().toModel(await this.model.answer.create({ data }));
  }
}
