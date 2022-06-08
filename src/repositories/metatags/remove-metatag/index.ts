import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveMetatagDTO } from '@/dtos/metatags/remove-metatag.dto';

@Injectable()
export class RemoveMetatagRepository
  implements IBaseRepository<RemoveMetatagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveMetatagDTO): Promise<boolean> {
    const removed = await this.model.metatag.delete({
      where: {
        id: where?.metatagId
      }
    });
    return !!removed;
  }
}
