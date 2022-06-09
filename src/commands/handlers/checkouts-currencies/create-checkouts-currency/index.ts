import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/create-checkouts-currency.command';
import {
  CheckoutsCurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCheckoutsCurrencyRepository } from '@/repositories/checkouts-currencies/create-checkouts-currency';

type CreateCheckoutsCurrencyCommandKeys = keyof CreateCheckoutsCurrencyCommand;

@CommandHandler(CreateCheckoutsCurrencyCommand)
export class CreateCheckoutsCurrencyCommandHandler
  implements ICommandHandler<CreateCheckoutsCurrencyCommand>
{
  constructor(
    private readonly createCheckoutsCurrencyRepository: CreateCheckoutsCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCheckoutsCurrencyCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCheckoutsCurrencyCommandKeys>(
        'parent'
      );
    }

    const checkoutsCurrencyCreated =
      await this.createCheckoutsCurrencyRepository.execute(data);
    if (!checkoutsCurrencyCreated) {
      throw new CheckoutsCurrencyNotFoundException();
    }
    const checkoutsCurrencyModel = this.publisher.mergeObjectContext(
      checkoutsCurrencyCreated
    );
    checkoutsCurrencyModel.createdCheckoutsCurrency();
    checkoutsCurrencyModel.commit();

    return checkoutsCurrencyCreated;
  }

  private clearData(
    command: CreateCheckoutsCurrencyCommand
  ): CreateCheckoutsCurrencyCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
