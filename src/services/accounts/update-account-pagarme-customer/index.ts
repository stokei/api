import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateAccountPagarmeCustomerCommand } from '@/commands/implements/accounts/update-account-pagarme-customer.command';
import { UpdateAccountPagarmeCustomerDTO } from '@/dtos/accounts/update-account-pagarme-customer.dto';
import { AccountModel } from '@/models/account.model';

@Injectable()
export class UpdateAccountPagarmeCustomerService
  implements
    IBaseService<UpdateAccountPagarmeCustomerDTO, Promise<AccountModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateAccountPagarmeCustomerDTO): Promise<AccountModel> {
    return await this.commandBus.execute(
      new UpdateAccountPagarmeCustomerCommand(data)
    );
  }
}
