import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomStudentDTO } from '@/dtos/classroom-students/remove-classroom-student.dto';

@Injectable()
export class RemoveClassroomStudentRepository
  implements IBaseRepository<RemoveClassroomStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomStudentDTO): Promise<boolean> {
    const removed = await this.model.classroomStudent.deleteMany({
      where: {
        app: where?.app,
        classroom: where?.classroom,
        student: where?.student
      }
    });
    return removed?.count > 0;
  }
}
