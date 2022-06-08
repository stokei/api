import { CreateCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/create-checkouts-currency.command';
import { CreateCheckoutsCurrencyDTO } from '@/dtos/checkouts-currencies/create-checkouts-currency.dto';
import { CheckoutsCurrencyModel } from '@/models/checkouts-currency.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateCheckoutsCurrencyService
  implements
    IBaseService<CreateCheckoutsCurrencyDTO, Promise<CheckoutsCurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(
    data: CreateCheckoutsCurrencyDTO
  ): Promise<CheckoutsCurrencyModel> {
    return await this.commandBus.execute(
      new CreateCheckoutsCurrencyCommand(data)
    );
  }
}
