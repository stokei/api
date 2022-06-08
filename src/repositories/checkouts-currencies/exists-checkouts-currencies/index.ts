import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { ExistsCheckoutsCurrenciesDTO } from '@/dtos/checkouts-currencies/exists-checkouts-currencies.dto';
import { IBaseRepository } from '@stokei/nestjs';

@Injectable()
export class ExistsCheckoutsCurrenciesRepository
  implements IBaseRepository<ExistsCheckoutsCurrenciesDTO, Promise<boolean>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: ExistsCheckoutsCurrenciesDTO): Promise<boolean> {
    return (await this.model.checkoutsCurrency.count({ where })) > 0;
  }
}
