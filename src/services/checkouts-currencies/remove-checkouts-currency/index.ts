import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/remove-checkouts-currency.command';
import { RemoveCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/remove-checkouts-currency.dto';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

@Injectable()
export class RemoveCheckoutsCurrencyService
  implements
    IBaseService<RemoveCheckoutsCurrencyDTO, Promise<CheckoutsCurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: RemoveCheckoutsCurrencyDTO
  ): Promise<CheckoutsCurrencyModel> {
    return await this.commandBus.execute(
      new RemoveCheckoutsCurrencyCommand(data)
    );
  }
}
