import { Injectable } from '@nestjs/common';
import { IBaseService, splitServiceId } from '@stokei/nestjs';

import { defaultAccountId } from '@/constants/default-account-id';
import { defaultAppId } from '@/constants/default-app-id';
import { CreateAccountDTO } from '@/dtos/accounts/create-account.dto';
import { CreateAccountService } from '@/services/accounts/create-account';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';
import { UpdateAccountService } from '@/services/accounts/update-account';

import { BaseSeeds } from '../base-seeds';

type AccountDataDTO = CreateAccountDTO;

@Injectable()
export class AccountsSeeds
  extends BaseSeeds
  implements IBaseService<any, Promise<void>>
{
  constructor(
    private readonly createAccountService: CreateAccountService,
    private readonly updateAccountService: UpdateAccountService,
    private readonly findAllAccountsService: FindAllAccountsService
  ) {
    super();
  }

  async execute() {
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

    accountsToCreate?.forEach(async (accountData) => {
      const account = await this.createAccountService.execute(accountData);
      return account;
    });
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
  async runAccountEventsAfterCreation() {
    return await Promise.all(
      this.createData()?.map(async (accountData) => {
        const account = await this.updateAccountService.execute({
          data: {
            firstname: accountData.firstname,
            updatedBy: accountData.createdBy
          },
          where: {
            account: accountData.id,
            app: accountData.app
          }
        });
        return account;
      })
    );
  }
}
