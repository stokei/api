import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCheckoutCommand } from '@/commands/implements/checkouts/remove-checkout.command';
import {
  CheckoutNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCheckoutByIdRepository } from '@/repositories/checkouts/find-checkout-by-id';
import { RemoveCheckoutRepository } from '@/repositories/checkouts/remove-checkout';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveCheckoutCommandKeys = keyof RemoveCheckoutCommand;

@CommandHandler(RemoveCheckoutCommand)
export class RemoveCheckoutCommandHandler
  implements ICommandHandler<RemoveCheckoutCommand>
{
  constructor(
    private readonly findCheckoutByIdRepository: FindCheckoutByIdRepository,
    private readonly removeCheckoutRepository: RemoveCheckoutRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const checkoutId = splitServiceId(data.where?.checkoutId)?.id;
    if (!checkoutId) {
      throw new ParamNotFoundException('checkoutId');
    }

    const checkout = await this.findCheckoutByIdRepository.execute(checkoutId);
    if (!checkout) {
      throw new CheckoutNotFoundException();
    }

    const removed = await this.removeCheckoutRepository.execute({
      where: {
        checkoutId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const checkoutModel = this.publisher.mergeObjectContext(checkout);
    checkoutModel.removedCheckout();
    checkoutModel.commit();

    return checkout;
  }

  private clearData(command: RemoveCheckoutCommand): RemoveCheckoutCommand {
    return cleanObject({
      where: cleanObject({
        checkoutId: cleanValue(command?.where?.checkoutId)
      })
    });
  }
}
