import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { UpdateClassroomsStudentDTO } from '@/dtos/classrooms-students/update-classrooms-student.dto';

@Injectable()
export class UpdateClassroomsStudentRepository
  implements IBaseRepository<UpdateClassroomsStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomsStudentDTO): Promise<boolean> {
    const updated = await this.model.classroomsStudent.update({
      where: {
        id: where?.classroomsStudentId
      },
      data
    });
    return !!updated;
  }
}
