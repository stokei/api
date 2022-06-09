import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ClassroomsAdminMapper } from '@/mappers/classrooms-admins';
import { ClassroomsAdminModel } from '@/models/classrooms-admin.model';

@Injectable()
export class FindClassroomsAdminByIdRepository
  implements IBaseRepository<string, Promise<ClassroomsAdminModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<ClassroomsAdminModel> {
    return new ClassroomsAdminMapper().toModel(
      await this.model.classroomsAdmin.findUnique({
        where: { id }
      })
    );
  }
}
