import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CountAccountsDTO } from '@/dtos/accounts/count-accounts.dto';
import { AccountMapper } from '@/mappers/accounts';

@Injectable()
export class CountAccountsRepository
  implements IBaseRepository<CountAccountsDTO, Promise<number>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({ where }: CountAccountsDTO): Promise<number> {
    const accountMapper = new AccountMapper();
    return await this.model.account.count({
      where: accountMapper.toWhereFindAllPrisma(where)
    });
  }
}
