import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateTagDTO } from '@/dtos/tags/update-tag.dto';

@Injectable()
export class UpdateTagRepository
  implements IBaseRepository<UpdateTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateTagDTO): Promise<boolean> {
    const updated = await this.model.tag.update({
      where: {
        id: where?.tagId
      },
      data
    });
    return !!updated;
  }
}
