import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateCoursesStudentDTO } from '@/dtos/courses-students/update-courses-student.dto';

@Injectable()
export class UpdateCoursesStudentRepository
  implements IBaseRepository<UpdateCoursesStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateCoursesStudentDTO): Promise<boolean> {
    const updated = await this.model.coursesStudent.update({
      where: {
        id: where?.coursesStudentId
      },
      data
    });
    return !!updated;
  }
}
