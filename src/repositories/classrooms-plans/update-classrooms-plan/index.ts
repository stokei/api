import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateClassroomsPlanDTO } from '@/dtos/classrooms-plans/update-classrooms-plan.dto';

@Injectable()
export class UpdateClassroomsPlanRepository
  implements IBaseRepository<UpdateClassroomsPlanDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ data, where }: UpdateClassroomsPlanDTO): Promise<boolean> {
    const updated = await this.model.classroomsPlan.update({
      where: {
        id: where?.classroomsPlanId
      },
      data
    });
    return !!updated;
  }
}
