import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsTagMapper } from '@/mappers/classrooms-tags';
import { CreateClassroomsTagDTO } from '@/dtos/classrooms-tags/create-classrooms-tag.dto';
import { ClassroomsTagModel } from '@/models/classrooms-tag.model';

@Injectable()
export class CreateClassroomsTagRepository
  implements
    IBaseRepository<CreateClassroomsTagDTO, Promise<ClassroomsTagModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateClassroomsTagDTO): Promise<ClassroomsTagModel> {
    return new ClassroomsTagMapper().toModel(
      await this.model.classroomsTag.create({ data })
    );
  }
}
