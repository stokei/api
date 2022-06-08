import { CreateCurrencyCommand } from '@/commands/implements/currencies/create-currency.command';
import { CreateCurrencyDTO } from '@/dtos/currencies/create-currency.dto';
import { CurrencyModel } from '@/models/currency.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateCurrencyService
  implements IBaseService<CreateCurrencyDTO, Promise<CurrencyModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCurrencyDTO): Promise<CurrencyModel> {
    return await this.commandBus.execute(new CreateCurrencyCommand(data));
  }
}
