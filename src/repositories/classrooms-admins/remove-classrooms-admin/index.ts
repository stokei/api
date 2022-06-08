import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { RemoveClassroomsAdminDTO } from '@/dtos/classrooms-admins/remove-classrooms-admin.dto';

@Injectable()
export class RemoveClassroomsAdminRepository
  implements IBaseRepository<RemoveClassroomsAdminDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveClassroomsAdminDTO): Promise<boolean> {
    const removed = await this.model.classroomsAdmin.delete({
      where: {
        id: where?.classroomsAdminId
      }
    });
    return !!removed;
  }
}
