import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountClassroomInstructorsDTO } from '@/dtos/classroom-instructors/count-classroom-instructors.dto';
import { ClassroomInstructorMapper } from '@/mappers/classroom-instructors';

@Injectable()
export class CountClassroomInstructorsRepository
  implements IBaseRepository<CountClassroomInstructorsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountClassroomInstructorsDTO): Promise<number> {
    const classroomInstructorMapper = new ClassroomInstructorMapper();
    return await this.model.classroomInstructor.count({
      where: classroomInstructorMapper.toWhereFindAllPrisma(where)
    });
  }
}
