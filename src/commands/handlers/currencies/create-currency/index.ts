import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateCurrencyCommand } from '@/commands/implements/currencies/create-currency.command';
import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCurrencyRepository } from '@/repositories/currencies/create-currency';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCurrencyCommandKeys>('parent');
    }

    const currencyCreated = await this.createCurrencyRepository.execute(data);
    if (!currencyCreated) {
      throw new CurrencyNotFoundException();
    }
    const currencyModel = this.publisher.mergeObjectContext(currencyCreated);
    currencyModel.createdCurrency();
    currencyModel.commit();

    return currencyCreated;
  }

  private clearData(command: CreateCurrencyCommand): CreateCurrencyCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
