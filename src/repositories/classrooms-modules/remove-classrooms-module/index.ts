import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveClassroomsModuleDTO } from '@/dtos/classrooms-modules/remove-classrooms-module.dto';

@Injectable()
export class RemoveClassroomsModuleRepository
  implements IBaseRepository<RemoveClassroomsModuleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsModuleDTO): Promise<boolean> {
    const removed = await this.model.classroomsModule.delete({
      where: {
        id: where?.classroomsModuleId
      }
    });
    return !!removed;
  }
}
