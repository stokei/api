import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllClassroomInstructorsDTO } from '@/dtos/classroom-instructors/find-all-classroom-instructors.dto';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';
import { ClassroomInstructorModel } from '@/models/classroom-instructor.model';

@Injectable()
export class FindAllClassroomInstructorsRepository
  implements
    IBaseRepository<
      FindAllClassroomInstructorsDTO,
      Promise<ClassroomInstructorModel[]>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAllClassroomInstructorsDTO
  ): Promise<ClassroomInstructorModel[]> {
    const classroomInstructorMapper = new ClassroomInstructorMapper();
    return classroomInstructorMapper.toModels(
      await this.model.classroomInstructor.findMany(
        classroomInstructorMapper.toFindAllPrisma(data)
      )
    );
  }
}
