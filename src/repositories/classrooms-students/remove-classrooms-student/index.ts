import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveClassroomsStudentDTO } from '@/dtos/classrooms-students/remove-classrooms-student.dto';

@Injectable()
export class RemoveClassroomsStudentRepository
  implements IBaseRepository<RemoveClassroomsStudentDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsStudentDTO): Promise<boolean> {
    const removed = await this.model.classroomsStudent.delete({
      where: {
        id: where?.classroomsStudentId
      }
    });
    return !!removed;
  }
}
