import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountRecurringsDTO } from '@/dtos/recurrings/count-recurrings.dto';
import { RecurringMapper } from '@/mappers/recurrings';

@Injectable()
export class CountRecurringsRepository
  implements IBaseRepository<CountRecurringsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountRecurringsDTO): Promise<number> {
    const recurringMapper = new RecurringMapper();
    return await this.model.recurring.count({
      where: recurringMapper.toWhereFindAllPrisma(where)
    });
  }
}
