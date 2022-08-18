import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCheckoutSessionCommand } from '@/commands/implements/checkouts/create-checkout-session.command';
import { CreateCheckoutSessionDTO } from '@/dtos/checkouts/create-checkout-session.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class CreateCheckoutSessionService
  implements IBaseService<CreateCheckoutSessionDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCheckoutSessionDTO): Promise<CheckoutModel> {
    return await this.commandBus.execute(
      new CreateCheckoutSessionCommand(data)
    );
  }
}
