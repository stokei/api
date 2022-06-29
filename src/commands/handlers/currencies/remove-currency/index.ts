import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCurrencyCommand } from '@/commands/implements/currencies/remove-currency.command';
import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCurrencyByIdRepository } from '@/repositories/currencies/find-currency-by-id';
import { RemoveCurrencyRepository } from '@/repositories/currencies/remove-currency';

type RemoveCurrencyCommandKeys = keyof RemoveCurrencyCommand;

@CommandHandler(RemoveCurrencyCommand)
export class RemoveCurrencyCommandHandler
  implements ICommandHandler<RemoveCurrencyCommand>
{
  constructor(
    private readonly findCurrencyByIdRepository: FindCurrencyByIdRepository,
    private readonly removeCurrencyRepository: RemoveCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCurrencyCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const currencyId = splitServiceId(data.where?.currencyId)?.id;
    if (!currencyId) {
      throw new ParamNotFoundException('currencyId');
    }

    const currency = await this.findCurrencyByIdRepository.execute(currencyId);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    const removed = await this.removeCurrencyRepository.execute({
      where: {
        ...data.where,
        currencyId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const currencyModel = this.publisher.mergeObjectContext(currency);
    currencyModel.removedCurrency({
      removedBy: data.where.removedBy
    });
    currencyModel.commit();

    return currency;
  }

  private clearData(command: RemoveCurrencyCommand): RemoveCurrencyCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        currencyId: cleanValue(command?.where?.currencyId)
      })
    });
  }
}
