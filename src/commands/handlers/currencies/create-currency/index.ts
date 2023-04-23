import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateCurrencyCommand } from '@/commands/implements/currencies/create-currency.command';
import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCurrencyRepository } from '@/repositories/currencies/create-currency';

type CreateCurrencyCommandKeys = keyof CreateCurrencyCommand;

@CommandHandler(CreateCurrencyCommand)
export class CreateCurrencyCommandHandler
  implements ICommandHandler<CreateCurrencyCommand>
{
  constructor(
    private readonly createCurrencyRepository: CreateCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCurrencyCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.id) {
      throw new ParamNotFoundException<CreateCurrencyCommandKeys>('id');
    }

    const currencyCreated = await this.createCurrencyRepository.execute(data);
    if (!currencyCreated) {
      throw new CurrencyNotFoundException();
    }
    const currencyModel = this.publisher.mergeObjectContext(currencyCreated);
    currencyModel.createdCurrency({
      createdBy: data.createdBy
    });
    currencyModel.commit();

    return currencyCreated;
  }

  private clearData(command: CreateCurrencyCommand): CreateCurrencyCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      name: cleanValue(command?.name),
      symbol: cleanValue(command?.symbol),
      minorUnit: cleanValueNumber(command?.minorUnit),
      id: cleanValue(command?.id)
    });
  }
}
