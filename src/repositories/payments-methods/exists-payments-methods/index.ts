import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsPaymentsMethodsDTO } from '@/dtos/payments-methods/exists-payments-methods.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsPaymentsMethodsRepository
  implements IBaseRepository<ExistsPaymentsMethodsDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsPaymentsMethodsDTO): Promise<boolean> {
    return (await this.model.paymentsMethod.count({ where })) > 0;
  }
}
