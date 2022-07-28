import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomStudentsDTO } from '@/dtos/classroom-students/count-classroom-students.dto';
import { ClassroomStudentMapper } from '@/mappers/classroom-students';

@Injectable()
export class CountClassroomStudentsRepository
  implements IBaseRepository<CountClassroomStudentsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomStudentsDTO): Promise<number> {
    const classroomStudentMapper = new ClassroomStudentMapper();
    return await this.model.classroomStudent.count({
      where: classroomStudentMapper.toWhereFindAllPrisma(where)
    });
  }
}
