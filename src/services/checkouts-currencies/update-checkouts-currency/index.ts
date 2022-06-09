import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/update-checkouts-currency.command';
import { UpdateCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/update-checkouts-currency.dto';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';

@Injectable()
export class UpdateCheckoutsCurrencyService
  implements
    IBaseService<UpdateCheckoutsCurrencyDTO, Promise<CheckoutsCurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: UpdateCheckoutsCurrencyDTO
  ): Promise<CheckoutsCurrencyModel> {
    return await this.commandBus.execute(
      new UpdateCheckoutsCurrencyCommand(data)
    );
  }
}
