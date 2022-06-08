import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { ClassroomsAdminMapper } from '@/mappers/classrooms-admins';
import { CreateClassroomsAdminDTO } from '@/dtos/classrooms-admins/create-classrooms-admin.dto';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class CreateClassroomsAdminRepository
  implements
    IBaseRepository<CreateClassroomsAdminDTO, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateClassroomsAdminDTO): Promise<ClassroomsAdminModel> {
    return new ClassroomsAdminMapper().toModel(
      await this.model.classroomsAdmin.create({ data })
    );
  }
}
