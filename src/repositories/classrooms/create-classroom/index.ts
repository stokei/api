import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomMapper } from '@/mappers/classrooms';
import { CreateClassroomDTO } from '@/dtos/classrooms/create-classroom.dto';
import { ClassroomModel } from '@/models/classroom.model';

@Injectable()
export class CreateClassroomRepository
  implements IBaseRepository<CreateClassroomDTO, Promise<ClassroomModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateClassroomDTO): Promise<ClassroomModel> {
    return new ClassroomMapper().toModel(
      await this.model.classroom.create({ data })
    );
  }
}
