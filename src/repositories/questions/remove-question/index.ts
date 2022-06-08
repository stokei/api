import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveQuestionDTO } from '@/dtos/questions/remove-question.dto';

@Injectable()
export class RemoveQuestionRepository
  implements IBaseRepository<RemoveQuestionDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveQuestionDTO): Promise<boolean> {
    const removed = await this.model.question.delete({
      where: {
        id: where?.questionId
      }
    });
    return !!removed;
  }
}
