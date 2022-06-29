import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePriceCommand } from '@/commands/implements/prices/create-price.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { CreatePriceRepository } from '@/repositories/prices/create-price';

type CreatePriceCommandKeys = keyof CreatePriceCommand;

@CommandHandler(CreatePriceCommand)
export class CreatePriceCommandHandler
  implements ICommandHandler<CreatePriceCommand>
{
  constructor(
    private readonly createPriceRepository: CreatePriceRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('parent');
    }

    const priceCreated = await this.createPriceRepository.execute(data);
    if (!priceCreated) {
      throw new PriceNotFoundException();
    }
    const priceModel = this.publisher.mergeObjectContext(priceCreated);
    priceModel.createdPrice({
      createdBy: data.createdBy
    });
    priceModel.commit();

    return priceCreated;
  }

  private clearData(command: CreatePriceCommand): CreatePriceCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
