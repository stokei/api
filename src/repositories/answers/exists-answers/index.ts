import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsAnswersDTO } from '@/dtos/answers/exists-answers.dto';

@Injectable()
export class ExistsAnswersRepository
  implements IBaseRepository<ExistsAnswersDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsAnswersDTO): Promise<boolean> {
    return (await this.model.answer.count({ where })) > 0;
  }
}
