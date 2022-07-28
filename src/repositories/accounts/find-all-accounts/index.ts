import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAllAccountsDTO } from '@/dtos/accounts/find-all-accounts.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAllAccountsRepository
  implements IBaseRepository<FindAllAccountsDTO, Promise<AccountModel[]>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: FindAllAccountsDTO): Promise<AccountModel[]> {
    const accountMapper = new AccountMapper();
    return accountMapper.toModels(
      await this.model.account.findMany(accountMapper.toFindAllPrisma(data))
    );
  }
}
