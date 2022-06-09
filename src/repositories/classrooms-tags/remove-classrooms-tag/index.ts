import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomsTagDTO } from '@/dtos/classrooms-tags/remove-classrooms-tag.dto';

@Injectable()
export class RemoveClassroomsTagRepository
  implements IBaseRepository<RemoveClassroomsTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsTagDTO): Promise<boolean> {
    const removed = await this.model.classroomsTag.delete({
      where: {
        id: where?.classroomsTagId
      }
    });
    return !!removed;
  }
}
