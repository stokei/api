import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsTagMapper } from '@/mappers/classrooms-tags';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

@Injectable()
export class FindClassroomsTagByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsTagModel> {
    return new ClassroomsTagMapper().toModel(
      await this.model.classroomsTag.findUnique({
        where: { id }
      })
    );
  }
}
