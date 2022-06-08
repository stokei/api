import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { AnswerMapper } from '@/mappers/answers';
import { CreateAnswerDTO } from '@/dtos/answers/create-answer.dto';
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
