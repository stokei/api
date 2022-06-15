import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByEmailRepository
  implements IBaseRepository<string, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(email: string): Promise<AccountModel> {
    return new AccountMapper().toModel(
      await this.model.account.findFirst({
        where: { email }
      })
    );
  }
}