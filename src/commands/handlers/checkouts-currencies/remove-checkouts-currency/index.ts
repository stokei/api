import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/remove-checkouts-currency.command';
import {
  CheckoutsCurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCheckoutsCurrencyByIdRepository } from '@/repositories/checkouts-currencies/find-checkouts-currency-by-id';
import { RemoveCheckoutsCurrencyRepository } from '@/repositories/checkouts-currencies/remove-checkouts-currency';

type RemoveCheckoutsCurrencyCommandKeys = keyof RemoveCheckoutsCurrencyCommand;

@CommandHandler(RemoveCheckoutsCurrencyCommand)
export class RemoveCheckoutsCurrencyCommandHandler
  implements ICommandHandler<RemoveCheckoutsCurrencyCommand>
{
  constructor(
    private readonly findCheckoutsCurrencyByIdRepository: FindCheckoutsCurrencyByIdRepository,
    private readonly removeCheckoutsCurrencyRepository: RemoveCheckoutsCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCheckoutsCurrencyCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const checkoutsCurrencyId = splitServiceId(
      data.where?.checkoutsCurrencyId
    )?.id;
    if (!checkoutsCurrencyId) {
      throw new ParamNotFoundException('checkoutsCurrencyId');
    }

    const checkoutsCurrency =
      await this.findCheckoutsCurrencyByIdRepository.execute(
        checkoutsCurrencyId
      );
    if (!checkoutsCurrency) {
      throw new CheckoutsCurrencyNotFoundException();
    }

    const removed = await this.removeCheckoutsCurrencyRepository.execute({
      where: {
        checkoutsCurrencyId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const checkoutsCurrencyModel =
      this.publisher.mergeObjectContext(checkoutsCurrency);
    checkoutsCurrencyModel.removedCheckoutsCurrency();
    checkoutsCurrencyModel.commit();

    return checkoutsCurrency;
  }

  private clearData(
    command: RemoveCheckoutsCurrencyCommand
  ): RemoveCheckoutsCurrencyCommand {
    return cleanObject({
      where: cleanObject({
        checkoutsCurrencyId: cleanValue(command?.where?.checkoutsCurrencyId)
      })
    });
  }
}
