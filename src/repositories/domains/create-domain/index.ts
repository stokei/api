import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { DomainMapper } from '@/mappers/domains';
import { CreateDomainDTO } from '@/dtos/domains/create-domain.dto';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class CreateDomainRepository
  implements IBaseRepository<CreateDomainDTO, Promise<DomainModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateDomainDTO): Promise<DomainModel> {
    return new DomainMapper().toModel(await this.model.domain.create({ data }));
  }
}
