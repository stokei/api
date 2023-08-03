import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
import { CreatePixCheckoutDTO } from '@/dtos/checkouts/create-pix-checkout.dto';
import { PixCheckoutModel } from '@/models/pix-checkout.model';

@Injectable()
export class CreatePixCheckoutService
  implements IBaseService<CreatePixCheckoutDTO, Promise<PixCheckoutModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePixCheckoutDTO): Promise<PixCheckoutModel> {
    return await this.commandBus.execute(
      new CreatePagarmeCheckoutCommand(data)
    );
  }
}
