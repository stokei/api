import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCheckoutsCurrencyCommand } from '@/commands/implements/checkouts-currencies/update-checkouts-currency.command';
import {
  CheckoutsCurrencyNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindCheckoutsCurrencyByIdRepository } from '@/repositories/checkouts-currencies/find-checkouts-currency-by-id';
import { UpdateCheckoutsCurrencyRepository } from '@/repositories/checkouts-currencies/update-checkouts-currency';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type UpdateCheckoutsCurrencyCommandKeys = keyof UpdateCheckoutsCurrencyCommand;

@CommandHandler(UpdateCheckoutsCurrencyCommand)
export class UpdateCheckoutsCurrencyCommandHandler
  implements ICommandHandler<UpdateCheckoutsCurrencyCommand>
{
  constructor(
    private readonly findCheckoutsCurrencyByIdRepository: FindCheckoutsCurrencyByIdRepository,
    private readonly updateCheckoutsCurrencyRepository: UpdateCheckoutsCurrencyRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateCheckoutsCurrencyCommand) {
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

    const updated = await this.updateCheckoutsCurrencyRepository.execute({
      ...data,
      where: {
        ...data.where,
        checkoutsCurrencyId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const checkoutsCurrencyUpdated =
      await this.findCheckoutsCurrencyByIdRepository.execute(
        checkoutsCurrencyId
      );
    if (!checkoutsCurrencyUpdated) {
      throw new CheckoutsCurrencyNotFoundException();
    }
    const checkoutsCurrencyModel = this.publisher.mergeObjectContext(
      checkoutsCurrencyUpdated
    );
    checkoutsCurrencyModel.updatedCheckoutsCurrency();
    checkoutsCurrencyModel.commit();

    return checkoutsCurrencyUpdated;
  }

  private clearData(
    command: UpdateCheckoutsCurrencyCommand
  ): UpdateCheckoutsCurrencyCommand {
    return cleanObject({
      where: cleanObject({
        checkoutsCurrencyId: cleanValue(command?.where?.checkoutsCurrencyId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name)
      })
    });
  }
}
