import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCheckoutCommand } from '@/commands/implements/checkouts/remove-checkout.command';
import { RemoveCheckoutDTO } from '@/dtos/checkouts/remove-checkout.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class RemoveCheckoutService
  implements IBaseService<RemoveCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCheckoutDTO): Promise<CheckoutModel> {
    return await this.commandBus.execute(new RemoveCheckoutCommand(data));
  }
}
