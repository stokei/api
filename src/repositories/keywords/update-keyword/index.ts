import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateKeywordDTO } from '@/dtos/keywords/update-keyword.dto';

@Injectable()
export class UpdateKeywordRepository
  implements IBaseRepository<UpdateKeywordDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateKeywordDTO): Promise<boolean> {
    const updated = await this.model.keyword.update({
      where: {
        id: where?.keywordId
      },
      data
    });
    return !!updated;
  }
}
