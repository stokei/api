import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCurrenciesDTO } from '@/dtos/currencies/exists-currencies.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCurrenciesRepository
  implements IBaseRepository<ExistsCurrenciesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCurrenciesDTO): Promise<boolean> {
    return (await this.model.currency.count({ where })) > 0;
  }
}
