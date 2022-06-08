import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { ClassroomMapper } from '@/mappers/classrooms';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class FindClassroomByIdRepository
  implements IBaseRepository<string, Promise<ClassroomModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomModel> {
    return new ClassroomMapper().toModel(
      await this.model.classroom.findUnique({
        where: { id }
      })
    );
  }
}
