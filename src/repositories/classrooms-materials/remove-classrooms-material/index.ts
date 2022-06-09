import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveClassroomsMaterialDTO } from '@/dtos/classrooms-materials/remove-classrooms-material.dto';

@Injectable()
export class RemoveClassroomsMaterialRepository
  implements IBaseRepository<RemoveClassroomsMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsMaterialDTO): Promise<boolean> {
    const removed = await this.model.classroomsMaterial.delete({
      where: {
        id: where?.classroomsMaterialId
      }
    });
    return !!removed;
  }
}
