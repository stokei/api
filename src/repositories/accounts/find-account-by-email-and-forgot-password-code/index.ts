import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '@stokei/nestjs';

import { PrismaClient } from '@/database/prisma/client';
import { FindAccountByEmailAndForgotPasswordCodeRepositoryDTO } from '@/dtos/accounts/find-account-by-email-and-forgot-password-code-repository.dto';
import { AccountMapper } from '@/mappers/accounts';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class FindAccountByEmailAndForgotPasswordCodeRepository
  implements
    IBaseRepository<
      FindAccountByEmailAndForgotPasswordCodeRepositoryDTO,
      Promise<AccountModel>
    >
{
  constructor(private readonly model: PrismaClient) {}

  async execute(
    data: FindAccountByEmailAndForgotPasswordCodeRepositoryDTO
  ): Promise<AccountModel> {
    return new AccountMapper().toModel(
      await this.model.account.findFirst({
        where: {
          email: data.email,
          forgotPasswordCode: data.code
        }
      })
    );
  }
}
