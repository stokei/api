import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsDomainsDTO } from '@/dtos/domains/exists-domains.dto';

@Injectable()
export class ExistsDomainsRepository
  implements IBaseRepository<ExistsDomainsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsDomainsDTO): Promise<boolean> {
    return (await this.model.domain.count({ where })) > 0;
  }
}
