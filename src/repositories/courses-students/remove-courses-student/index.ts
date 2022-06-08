import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveCoursesStudentDTO } from '@/dtos/courses-students/remove-courses-student.dto';

@Injectable()
export class RemoveCoursesStudentRepository
  implements IBaseRepository<RemoveCoursesStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveCoursesStudentDTO): Promise<boolean> {
    const removed = await this.model.coursesStudent.delete({
      where: {
        id: where?.coursesStudentId
      }
    });
    return !!removed;
  }
}
