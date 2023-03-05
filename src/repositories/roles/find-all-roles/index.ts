import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllRolesDTO } from '@/dtos/roles/find-all-roles.dto';
import { RoleMapper } from '@/mappers/roles';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class FindAllRolesRepository
  implements IBaseRepository<FindAllRolesDTO, Promise<RoleModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllRolesDTO): Promise<RoleModel[]> {
    const roleMapper = new RoleMapper();
    return roleMapper.toModels(
      await this.model.role.findMany(roleMapper.toFindAllPrisma(data))
    );
  }
}
