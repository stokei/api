import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AccessMapper } from '@/mappers/accesses';
import { AccessModel } from '@/models/access.model';

@Injectable()
export class FindAccessByIdRepository
  implements IBaseRepository<string, Promise<AccessModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<AccessModel> {
    return new AccessMapper().toModel(
      await this.model.access.findUnique({
        where: { id }
      })
    );
  }
}
