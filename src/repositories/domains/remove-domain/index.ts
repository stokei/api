import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveDomainDTO } from '@/dtos/domains/remove-domain.dto';

@Injectable()
export class RemoveDomainRepository
  implements IBaseRepository<RemoveDomainDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveDomainDTO): Promise<boolean> {
    const removed = await this.model.domain.delete({
      where: {
        id: where?.domainId
      }
    });
    return !!removed;
  }
}
