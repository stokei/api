import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAccessRepositoryDTO } from '@/dtos/accesses/create-access-repository.dto';
import { AccessMapper } from '@/mappers/accesses';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class CreateAccessRepository
  implements IBaseRepository<CreateAccessRepositoryDTO, Promise<AccessModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAccessRepositoryDTO): Promise<AccessModel> {
    return new AccessMapper().toModel(await this.model.access.create({ data }));
  }
}
