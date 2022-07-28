import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomsDTO } from '@/dtos/classrooms/count-classrooms.dto';
import { ClassroomMapper } from '@/mappers/classrooms';

@Injectable()
export class CountClassroomsRepository
  implements IBaseRepository<CountClassroomsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomsDTO): Promise<number> {
    const classroomMapper = new ClassroomMapper();
    return await this.model.classroom.count({
      where: classroomMapper.toWhereFindAllPrisma(where)
    });
  }
}
