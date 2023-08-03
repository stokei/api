import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAccountPagarmeCustomerCommand } from '@/commands/implements/accounts/create-account-pagarme-customer.command';
import { CreateAccountPagarmeCustomerDTO } from '@/dtos/accounts/create-account-pagarme-customer.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class CreateAccountPagarmeCustomerService
  implements
    IBaseService<CreateAccountPagarmeCustomerDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAccountPagarmeCustomerDTO): Promise<AccountModel> {
    return await this.commandBus.execute(
      new CreateAccountPagarmeCustomerCommand(data)
    );
  }
}
