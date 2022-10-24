import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateRecurringDTO } from '@/dtos/recurrings/create-recurring.dto';
import { RecurringMapper } from '@/mappers/recurrings';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class CreateRecurringRepository
  implements IBaseRepository<CreateRecurringDTO, Promise<RecurringModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateRecurringDTO): Promise<RecurringModel> {
    return new RecurringMapper().toModel(
      await this.model.recurring.create({ data })
    );
  }
}
