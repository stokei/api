import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCurrencyCommand } from '@/commands/implements/currencies/update-currency.command';
import {
  CurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCurrencyByIdRepository } from '@/repositories/currencies/find-currency-by-id';
import { UpdateCurrencyRepository } from '@/repositories/currencies/update-currency';

type UpdateCurrencyCommandKeys = keyof UpdateCurrencyCommand;

@CommandHandler(UpdateCurrencyCommand)
export class UpdateCurrencyCommandHandler
  implements ICommandHandler<UpdateCurrencyCommand>
{
  constructor(
    private readonly findCurrencyByIdRepository: FindCurrencyByIdRepository,
    private readonly updateCurrencyRepository: UpdateCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCurrencyCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const currencyId = splitServiceId(data.where?.currencyId)?.id;
    if (!currencyId) {
      throw new ParamNotFoundException('currencyId');
    }

    const currency = await this.findCurrencyByIdRepository.execute(currencyId);
    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    const updated = await this.updateCurrencyRepository.execute({
      ...data,
      where: {
        ...data.where,
        currencyId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const currencyUpdated = await this.findCurrencyByIdRepository.execute(
      currencyId
    );
    if (!currencyUpdated) {
      throw new CurrencyNotFoundException();
    }
    const currencyModel = this.publisher.mergeObjectContext(currencyUpdated);
    currencyModel.updatedCurrency({
      updatedBy: data.data.updatedBy
    });
    currencyModel.commit();

    return currencyUpdated;
  }

  private clearData(command: UpdateCurrencyCommand): UpdateCurrencyCommand {
    return cleanObject({
      where: cleanObject({
        currencyId: cleanValue(command?.where?.currencyId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
