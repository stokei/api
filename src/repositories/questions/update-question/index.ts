import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateQuestionDTO } from '@/dtos/questions/update-question.dto';

@Injectable()
export class UpdateQuestionRepository
  implements IBaseRepository<UpdateQuestionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateQuestionDTO): Promise<boolean> {
    const updated = await this.model.question.update({
      where: {
        id: where?.questionId
      },
      data
    });
    return !!updated;
  }
}
