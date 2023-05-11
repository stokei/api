import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ActivateDomainRepositoryDTO } from '@/dtos/domains/activate-domain-repository.dto';
import { DomainMapper } from '@/mappers/domains';
import { DomainModel } from '@/models/domain.model';

@Injectable()
export class ActivateDomainRepository
  implements IBaseRepository<ActivateDomainRepositoryDTO, Promise<DomainModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: ActivateDomainRepositoryDTO): Promise<DomainModel> {
    return new DomainMapper().toModel(
      await this.model.domain.update({
        data: {
          status: data.status,
          active: data.active,
          activatedAt: data.activatedAt
        },
        where: {
          id: data.domain
        }
      })
    );
  }
}
