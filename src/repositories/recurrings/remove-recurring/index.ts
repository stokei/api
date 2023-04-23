import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RemoveRecurringDTO } from '@/dtos/recurrings/remove-recurring.dto';

@Injectable()
export class RemoveRecurringRepository
  implements IBaseRepository<RemoveRecurringDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: RemoveRecurringDTO): Promise<boolean> {
    const removed = await this.model.recurring.delete({
      where: {
        id: where?.recurring
      }
    });
    return !!removed;
  }
}
