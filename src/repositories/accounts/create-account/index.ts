import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@/database/prisma/client';
import { IBaseRepository } from '@stokei/nestjs';
import { AccountMapper } from '@/mappers/accounts';
import { CreateAccountRepositoryDTO } from '@/dtos/accounts/create-account-repository.dto';
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
