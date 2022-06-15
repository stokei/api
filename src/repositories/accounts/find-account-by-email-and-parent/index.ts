import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAccountByEmailAndParentDTO } from '@/dtos/accounts/find-account-by-email-and-parent.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByEmailAndParentRepository
  implements
    IBaseRepository<FindAccountByEmailAndParentDTO, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    email,
    parent
  }: FindAccountByEmailAndParentDTO): Promise<AccountModel> {
    return new AccountMapper().toModel(
      await this.model.account.findFirst({
        where: { email, parent }
      })
    );
  }
}
