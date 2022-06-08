import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemovePriceCommand } from '@/commands/implements/prices/remove-price.command';
import {
  PriceNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindPriceByIdRepository } from '@/repositories/prices/find-price-by-id';
import { RemovePriceRepository } from '@/repositories/prices/remove-price';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemovePriceCommandKeys = keyof RemovePriceCommand;

@CommandHandler(RemovePriceCommand)
export class RemovePriceCommandHandler
  implements ICommandHandler<RemovePriceCommand>
{
  constructor(
    private readonly findPriceByIdRepository: FindPriceByIdRepository,
    private readonly removePriceRepository: RemovePriceRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const priceId = splitServiceId(data.where?.priceId)?.id;
    if (!priceId) {
      throw new ParamNotFoundException('priceId');
    }

    const price = await this.findPriceByIdRepository.execute(priceId);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const removed = await this.removePriceRepository.execute({
      where: {
        priceId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const priceModel = this.publisher.mergeObjectContext(price);
    priceModel.removedPrice();
    priceModel.commit();

    return price;
  }

  private clearData(command: RemovePriceCommand): RemovePriceCommand {
    return cleanObject({
      where: cleanObject({
        priceId: cleanValue(command?.where?.priceId)
      })
    });
  }
}
