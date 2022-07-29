import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateDomainRepositoryDTO } from '@/dtos/domains/create-domain-repository.dto';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class CreateDomainRepository
  implements IBaseRepository<CreateDomainRepositoryDTO, Promise<DomainModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateDomainRepositoryDTO): Promise<DomainModel> {
    return new DomainMapper().toModel(await this.model.domain.create({ data }));
  }
}
