import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomsTagDTO } from '@/dtos/classrooms-tags/update-classrooms-tag.dto';

@Injectable()
export class UpdateClassroomsTagRepository
  implements IBaseRepository<UpdateClassroomsTagDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomsTagDTO): Promise<boolean> {
    const updated = await this.model.classroomsTag.update({
      where: {
        id: where?.classroomsTagId
      },
      data
    });
    return !!updated;
  }
}
