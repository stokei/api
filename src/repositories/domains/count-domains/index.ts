import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountDomainsDTO } from '@/dtos/domains/count-domains.dto';
import { DomainMapper } from '@/mappers/domains';

@Injectable()
export class CountDomainsRepository
  implements IBaseRepository<CountDomainsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountDomainsDTO): Promise<number> {
    const domainMapper = new DomainMapper();
    return await this.model.domain.count({
      where: domainMapper.toWhereFindAllPrisma(where)
    });
  }
}
