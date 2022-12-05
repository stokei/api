import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';
import { AccountModel } from '@/models/account.model';
import { CreateAccountService } from '@/services/accounts/create-account';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';

type AccountDataDTO = CreateAccountDTO;

@Injectable()
export class AccountsSeeds
  implements IBaseService<any, Promise<AccountModel[]>>
{
  constructor(
    private readonly createAccountService: CreateAccountService,
    private readonly findAllAccountsService: FindAllAccountsService
  ) {}

  async execute(): Promise<AccountModel[]> {
    const accountsData = this.createData();
    const accountsFounded = await this.findAllAccountsService.execute({
      where: {
        AND: {
          ids: [defaultAccountId]
        }
      }
    });
    let accountsToCreate = accountsData;
    if (accountsFounded?.items?.length > 0) {
      accountsToCreate = accountsData?.filter((account) => {
        const existsLanguage = accountsFounded?.items?.find(
          (accountFounded) => accountFounded.email === account.email
        );
        return !existsLanguage;
      });
    }
    const prismaClient = new PrismaClient();
    const accountsCreated = await Promise.all(
      accountsToCreate?.map(async (accountData) => {
        const account = await this.createAccountService.execute(accountData);
        return account;
      })
    );
    prismaClient.$disconnect();
    return [...accountsFounded?.items, ...accountsCreated];
  }

  private createData(): AccountDataDTO[] {
    return [
      {
        id: splitServiceId(defaultAccountId)?.id,
        firstname: 'Stokei',
        lastname: 'Admin',
        app: defaultAppId,
        email: 'admin@stokei.com',
        password: '123456',
        createdBy: defaultAccountId
      }
    ];
  }
}
