import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ConfirmCheckoutCommand } from '@/commands/implements/checkouts/confirm-checkout.command';
import { ConfirmCheckoutDTO } from '@/dtos/checkouts/confirm-checkout.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class ConfirmCheckoutService
  implements IBaseService<ConfirmCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ConfirmCheckoutDTO): Promise<CheckoutModel> {
    return await this.commandBus.execute(new ConfirmCheckoutCommand(data));
  }
}
