import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveAccessRepositoryDTO } from '@/dtos/accesses/remove-access-repository.dto';

@Injectable()
export class RemoveAccessRepository
  implements IBaseRepository<RemoveAccessRepositoryDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where, data }: RemoveAccessRepositoryDTO): Promise<boolean> {
    const removed = await this.model.access.update({
      where: {
        id: where?.access
      },
      data
    });
    return !!removed;
  }
}
