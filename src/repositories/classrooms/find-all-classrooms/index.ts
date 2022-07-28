import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomsDTO } from '@/dtos/classrooms/find-all-classrooms.dto';
import { ClassroomMapper } from '@/mappers/classrooms';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class FindAllClassroomsRepository
  implements IBaseRepository<FindAllClassroomsDTO, Promise<ClassroomModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllClassroomsDTO): Promise<ClassroomModel[]> {
    const classroomMapper = new ClassroomMapper();
    return classroomMapper.toModels(
      await this.model.classroom.findMany(classroomMapper.toFindAllPrisma(data))
    );
  }
}
