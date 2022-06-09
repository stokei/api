import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import {
  CheckoutNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateCheckoutRepository } from '@/repositories/checkouts/create-checkout';

type CreateCheckoutCommandKeys = keyof CreateCheckoutCommand;

@CommandHandler(CreateCheckoutCommand)
export class CreateCheckoutCommandHandler
  implements ICommandHandler<CreateCheckoutCommand>
{
  constructor(
    private readonly createCheckoutRepository: CreateCheckoutRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('parent');
    }

    const checkoutCreated = await this.createCheckoutRepository.execute(data);
    if (!checkoutCreated) {
      throw new CheckoutNotFoundException();
    }
    const checkoutModel = this.publisher.mergeObjectContext(checkoutCreated);
    checkoutModel.createdCheckout();
    checkoutModel.commit();

    return checkoutCreated;
  }

  private clearData(command: CreateCheckoutCommand): CreateCheckoutCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
