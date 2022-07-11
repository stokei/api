import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateCourseStudentDTO } from '@/dtos/course-students/update-course-student.dto';

@Injectable()
export class UpdateCourseStudentRepository
  implements IBaseRepository<UpdateCourseStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCourseStudentDTO): Promise<boolean> {
    const updated = await this.model.courseStudent.update({
      where: {
        id: where?.courseStudentId
      },
      data
    });
    return !!updated;
  }
}
