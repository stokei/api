import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { ExistsPaymentsDTO } from '@/dtos/payments/exists-payments.dto';

@Injectable()
export class ExistsPaymentsRepository
  implements IBaseRepository<ExistsPaymentsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPaymentsDTO): Promise<boolean> {
    return (await this.model.payment.count({ where })) > 0;
  }
}
