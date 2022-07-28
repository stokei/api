import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllDomainsDTO } from '@/dtos/domains/find-all-domains.dto';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class FindAllDomainsRepository
  implements IBaseRepository<FindAllDomainsDTO, Promise<DomainModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllDomainsDTO): Promise<DomainModel[]> {
    const domainMapper = new DomainMapper();
    return domainMapper.toModels(
      await this.model.domain.findMany(domainMapper.toFindAllPrisma(data))
    );
  }
}
