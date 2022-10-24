import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllRecurringsDTO } from '@/dtos/recurrings/find-all-recurrings.dto';
import { RecurringMapper } from '@/mappers/recurrings';
import { RecurringModel } from '@/models/recurring.model';

@Injectable()
export class FindAllRecurringsRepository
  implements IBaseRepository<FindAllRecurringsDTO, Promise<RecurringModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllRecurringsDTO): Promise<RecurringModel[]> {
    const recurringMapper = new RecurringMapper();
    return recurringMapper.toModels(
      await this.model.recurring.findMany(recurringMapper.toFindAllPrisma(data))
    );
  }
}
