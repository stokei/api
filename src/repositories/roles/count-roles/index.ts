import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountRolesDTO } from '@/dtos/roles/count-roles.dto';
import { RoleMapper } from '@/mappers/roles';

@Injectable()
export class CountRolesRepository
  implements IBaseRepository<CountRolesDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountRolesDTO): Promise<number> {
    const roleMapper = new RoleMapper();
    return await this.model.role.count({
      where: roleMapper.toWhereFindAllPrisma(where)
    });
  }
}
