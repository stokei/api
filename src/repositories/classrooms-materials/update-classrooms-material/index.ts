import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { UpdateClassroomsMaterialDTO } from '@/dtos/classrooms-materials/update-classrooms-material.dto';

@Injectable()
export class UpdateClassroomsMaterialRepository
  implements IBaseRepository<UpdateClassroomsMaterialDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    data,
    where
  }: UpdateClassroomsMaterialDTO): Promise<boolean> {
    const updated = await this.model.classroomsMaterial.update({
      where: {
        id: where?.classroomsMaterialId
      },
      data
    });
    return !!updated;
  }
}
