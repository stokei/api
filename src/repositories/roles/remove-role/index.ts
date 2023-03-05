import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveRoleDTO } from '@/dtos/roles/remove-role.dto';

@Injectable()
export class RemoveRoleRepository
  implements IBaseRepository<RemoveRoleDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveRoleDTO): Promise<boolean> {
    const removed = await this.model.role.deleteMany({
      where: {
        id: where?.role,
        app: where?.app
      }
    });
    return removed?.count > 0;
  }
}
