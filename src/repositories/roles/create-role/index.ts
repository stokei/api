import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateRoleDTO } from '@/dtos/roles/create-role.dto';
import { RoleMapper } from '@/mappers/roles';
import { RoleModel } from '@/models/role.model';

@Injectable()
export class CreateRoleRepository
  implements IBaseRepository<CreateRoleDTO, Promise<RoleModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateRoleDTO): Promise<RoleModel> {
    return new RoleMapper().toModel(await this.model.role.create({ data }));
  }
}
