import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateCurrencyCommand } from '@/commands/implements/currencies/update-currency.command';
import { UpdateCurrencyDTO } from '@/dtos/currencies/update-currency.dto';
import { CurrencyModel } from '@/models/currency.model';

@Injectable()
export class UpdateCurrencyService
  implements IBaseService<UpdateCurrencyDTO, Promise<CurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCurrencyDTO): Promise<CurrencyModel> {
    return await this.commandBus.execute(new UpdateCurrencyCommand(data));
  }
}
