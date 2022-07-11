import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomStudentDTO } from '@/dtos/classroom-students/update-classroom-student.dto';

@Injectable()
export class UpdateClassroomStudentRepository
  implements IBaseRepository<UpdateClassroomStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomStudentDTO): Promise<boolean> {
    const updated = await this.model.classroomStudent.update({
      where: {
        id: where?.classroomStudentId
      },
      data
    });
    return !!updated;
  }
}
