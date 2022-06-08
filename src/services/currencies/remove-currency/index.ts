import { RemoveCurrencyCommand } from '@/commands/implements/currencies/remove-currency.command';
import { RemoveCurrencyDTO } from '@/dtos/currencies/remove-currency.dto';
import { CurrencyModel } from '@/models/currency.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveCurrencyService
  implements IBaseService<RemoveCurrencyDTO, Promise<CurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCurrencyDTO): Promise<CurrencyModel> {
    return await this.commandBus.execute(new RemoveCurrencyCommand(data));
  }
}
