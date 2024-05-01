import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';

@Injectable()
export class RemoveComponentsRepository
  implements IBaseRepository<string[], Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(ids: string[]): Promise<boolean> {
    const removed = await this.model.component.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
    return removed?.count > 0;
  }
}
