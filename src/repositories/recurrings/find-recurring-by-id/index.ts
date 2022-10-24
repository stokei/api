import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { RecurringMapper } from '@/mappers/recurrings';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class FindRecurringByIdRepository
  implements IBaseRepository<string, Promise<RecurringModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(id: string): Promise<RecurringModel> {
    return new RecurringMapper().toModel(
      await this.model.recurring.findUnique({
        where: { id }
      })
    );
  }
}
