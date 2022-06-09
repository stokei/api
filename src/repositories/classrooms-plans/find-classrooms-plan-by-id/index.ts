import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsPlanMapper } from '@/mappers/classrooms-plans';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

@Injectable()
export class FindClassroomsPlanByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsPlanModel> {
    return new ClassroomsPlanMapper().toModel(
      await this.model.classroomsPlan.findUnique({
        where: { id }
      })
    );
  }
}
