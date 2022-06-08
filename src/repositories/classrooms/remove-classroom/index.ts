import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveClassroomDTO } from '@/dtos/classrooms/remove-classroom.dto';

@Injectable()
export class RemoveClassroomRepository
  implements IBaseRepository<RemoveClassroomDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomDTO): Promise<boolean> {
    const removed = await this.model.classroom.delete({
      where: {
        id: where?.classroomId
      }
    });
    return !!removed;
  }
}
