import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class FindDomainByNameRepository
  implements IBaseRepository<string, Promise<DomainModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(name: string): Promise<DomainModel> {
    return new DomainMapper().toModel(
      await this.model.domain.findFirst({
        where: { name }
      })
    );
  }
}
