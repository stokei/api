import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { CreateAccountRepositoryDTO } from '@/dtos/accounts/create-account-repository.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class CreateAccountRepository
  implements IBaseRepository<CreateAccountRepositoryDTO, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute(data: CreateAccountRepositoryDTO): Promise<AccountModel> {
    return new AccountMapper().toModel(
      await this.model.account.create({ data })
    );
  }
}
