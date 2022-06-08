import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsAnswersDTO } from '@/dtos/answers/exists-answers.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsAnswersRepository
  implements IBaseRepository<ExistsAnswersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAnswersDTO): Promise<boolean> {
    return (await this.model.answer.count({ where })) > 0;
  }
}
