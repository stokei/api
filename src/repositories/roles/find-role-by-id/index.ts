import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RoleMapper } from '@/mappers/roles';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class FindRoleByIdRepository
  implements IBaseRepository<string, Promise<RoleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<RoleModel> {
    return new RoleMapper().toModel(
      await this.model.role.findUnique({
        where: { id }
      })
    );
  }
}
