import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import { CreateCheckoutDTO } from '@/dtos/checkouts/create-checkout.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class CreateCheckoutService
  implements IBaseService<CreateCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCheckoutDTO): Promise<CheckoutModel> {
    return await this.commandBus.execute(new CreateCheckoutCommand(data));
  }
}
