import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveAnswerDTO } from '@/dtos/answers/remove-answer.dto';

@Injectable()
export class RemoveAnswerRepository
  implements IBaseRepository<RemoveAnswerDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveAnswerDTO): Promise<boolean> {
    const removed = await this.model.answer.delete({
      where: {
        id: where?.answerId
      }
    });
    return !!removed;
  }
}
