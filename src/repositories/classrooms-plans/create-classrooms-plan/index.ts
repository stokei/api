import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsPlanMapper } from '@/mappers/classrooms-plans';
import { CreateClassroomsPlanDTO } from '@/dtos/classrooms-plans/create-classrooms-plan.dto';
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
