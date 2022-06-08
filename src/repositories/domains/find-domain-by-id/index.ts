import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';
import { PrismaClient } from '@/database/prisma/client';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class FindDomainByIdRepository
  implements IBaseRepository<string, Promise<DomainModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<DomainModel> {
    return new DomainMapper().toModel(
      await this.model.domain.findUnique({
        where: { id }
      })
    );
  }
}
