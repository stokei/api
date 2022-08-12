import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

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
    if (!data?.currency) {
      throw new ParamNotFoundException<CreatePriceCommandKeys>('currency');
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
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      currency: cleanValue(command?.currency),
      default: cleanValueBoolean(command?.default),
      fromAmount: cleanValueNumber(command?.fromAmount),
      amount: cleanValueNumber(command?.amount),
      type: command?.type,
      inventoryType: command?.inventoryType,
      recurringIntervalCount: cleanValueNumber(command?.recurringIntervalCount),
      recurringIntervalType: command?.recurringIntervalType,
      quantity: cleanValueNumber(command?.quantity),
      parent: cleanValue(command?.parent)
    });
  }
}
