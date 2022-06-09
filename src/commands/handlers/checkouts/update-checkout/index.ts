import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateCheckoutCommand } from '@/commands/implements/checkouts/update-checkout.command';
import {
  CheckoutNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCheckoutByIdRepository } from '@/repositories/checkouts/find-checkout-by-id';
import { UpdateCheckoutRepository } from '@/repositories/checkouts/update-checkout';

type UpdateCheckoutCommandKeys = keyof UpdateCheckoutCommand;

@CommandHandler(UpdateCheckoutCommand)
export class UpdateCheckoutCommandHandler
  implements ICommandHandler<UpdateCheckoutCommand>
{
  constructor(
    private readonly findCheckoutByIdRepository: FindCheckoutByIdRepository,
    private readonly updateCheckoutRepository: UpdateCheckoutRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCheckoutCommand) {
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

    const updated = await this.updateCheckoutRepository.execute({
      ...data,
      where: {
        ...data.where,
        checkoutId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const checkoutUpdated = await this.findCheckoutByIdRepository.execute(
      checkoutId
    );
    if (!checkoutUpdated) {
      throw new CheckoutNotFoundException();
    }
    const checkoutModel = this.publisher.mergeObjectContext(checkoutUpdated);
    checkoutModel.updatedCheckout();
    checkoutModel.commit();

    return checkoutUpdated;
  }

  private clearData(command: UpdateCheckoutCommand): UpdateCheckoutCommand {
    return cleanObject({
      where: cleanObject({
        checkoutId: cleanValue(command?.where?.checkoutId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
