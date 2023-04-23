import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemovePriceCommand } from '@/commands/implements/prices/remove-price.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { RemovePriceRepository } from '@/repositories/prices/remove-price';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { DeleteStripePriceService } from '@/services/stripe/delete-stripe-price';

@CommandHandler(RemovePriceCommand)
export class RemovePriceCommandHandler
  implements ICommandHandler<RemovePriceCommand>
{
  constructor(
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly deleteStripePriceService: DeleteStripePriceService,
    private readonly removePriceRepository: RemovePriceRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const priceId = data.where?.price;
    if (!priceId) {
      throw new ParamNotFoundException('priceId');
    }

    const price = await this.findPriceByIdService.execute(priceId);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const removed = await this.removePriceRepository.execute({
      where: {
        ...data.where,
        price: priceId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }

    await this.deleteStripePriceService.execute(price.stripePrice);

    const priceModel = this.publisher.mergeObjectContext(price);
    priceModel.removedPrice({
      removedBy: data.where.removedBy
    });
    priceModel.commit();

    return price;
  }

  private clearData(command: RemovePriceCommand): RemovePriceCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        price: cleanValue(command?.where?.price)
      })
    });
  }
}
