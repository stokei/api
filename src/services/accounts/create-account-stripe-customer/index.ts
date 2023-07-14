import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateAccountStripeCustomerCommand } from '@/commands/implements/accounts/create-account-stripe-customer.command';
import { CreateAccountStripeCustomerDTO } from '@/dtos/accounts/create-account-stripe-customer.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class CreateAccountStripeCustomerService
  implements
    IBaseService<CreateAccountStripeCustomerDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateAccountStripeCustomerDTO): Promise<AccountModel> {
    return await this.commandBus.execute(
      new CreateAccountStripeCustomerCommand(data)
    );
  }
}
