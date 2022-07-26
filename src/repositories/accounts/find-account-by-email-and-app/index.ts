import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAccountByEmailAndAppDTO } from '@/dtos/accounts/find-account-by-email-and-app.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByEmailAndAppRepository
  implements
    IBaseRepository<FindAccountByEmailAndAppDTO, Promise<AccountModel>>
{
  constructor(private readonly model: PrismaClient) {}

  async execute({
    email,
    app
  }: FindAccountByEmailAndAppDTO): Promise<AccountModel> {
    return new AccountMapper().toModel(
      await this.model.account.findFirst({
        where: { email, app }
      })
    );
  }
}
