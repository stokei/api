import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCheckoutCommand } from '@/commands/implements/checkouts/update-checkout.command';
import { UpdateCheckoutDTO } from '@/dtos/checkouts/update-checkout.dto';
import { CheckoutModel } from '@/models/checkout.model';

@Injectable()
export class UpdateCheckoutService
  implements IBaseService<UpdateCheckoutDTO, Promise<CheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCheckoutDTO): Promise<CheckoutModel> {
    return await this.commandBus.execute(new UpdateCheckoutCommand(data));
  }
}
