import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomInstructorDTO } from '@/dtos/classroom-instructors/update-classroom-instructor.dto';

@Injectable()
export class UpdateClassroomInstructorRepository
  implements IBaseRepository<UpdateClassroomInstructorDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateClassroomInstructorDTO): Promise<boolean> {
    const updated = await this.model.classroomInstructor.update({
      where: {
        id: where?.classroomInstructorId
      },
      data
    });
    return !!updated;
  }
}
