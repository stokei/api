import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateClassroomsPlanDTO } from '@/dtos/classrooms-plans/create-classrooms-plan.dto';
import { ClassroomsPlanMapper } from '@/mappers/classrooms-plans';
import { ClassroomsPlanModel } from '@/models/classrooms-plan.model';

@Injectable()
export class CreateClassroomsPlanRepository
  implements
    IBaseRepository<CreateClassroomsPlanDTO, Promise<ClassroomsPlanModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateClassroomsPlanDTO): Promise<ClassroomsPlanModel> {
    return new ClassroomsPlanMapper().toModel(
      await this.model.classroomsPlan.create({ data })
    );
  }
}
