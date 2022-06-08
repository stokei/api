import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveKeywordDTO } from '@/dtos/keywords/remove-keyword.dto';

@Injectable()
export class RemoveKeywordRepository
  implements IBaseRepository<RemoveKeywordDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveKeywordDTO): Promise<boolean> {
    const removed = await this.model.keyword.delete({
      where: {
        id: where?.keywordId
      }
    });
    return !!removed;
  }
}
