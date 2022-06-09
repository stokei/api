import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateAnswerDTO } from '@/dtos/answers/update-answer.dto';

@Injectable()
export class UpdateAnswerRepository
  implements IBaseRepository<UpdateAnswerDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateAnswerDTO): Promise<boolean> {
    const updated = await this.model.answer.update({
      where: {
        id: where?.answerId
      },
      data
    });
    return !!updated;
  }
}
