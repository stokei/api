import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber
} from '@stokei/nestjs';

import { CreatePriceTierCommand } from '@/commands/implements/price-tiers/create-price-tier.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceTierNotFoundException
} from '@/errors';
import { CreatePriceTierRepository } from '@/repositories/price-tiers/create-price-tier';

type CreatePriceTierCommandKeys = keyof CreatePriceTierCommand;

@CommandHandler(CreatePriceTierCommand)
export class CreatePriceTierCommandHandler
  implements ICommandHandler<CreatePriceTierCommand>
{
  constructor(
    private readonly createPriceTierRepository: CreatePriceTierRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePriceTierCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePriceTierCommandKeys>('parent');
    }

    const priceTierCreated = await this.createPriceTierRepository.execute(data);
    if (!priceTierCreated) {
      throw new PriceTierNotFoundException();
    }
    const priceTierModel = this.publisher.mergeObjectContext(priceTierCreated);
    priceTierModel.createdPriceTier({
      createdBy: data.createdBy
    });
    priceTierModel.commit();

    return priceTierCreated;
  }

  private clearData(command: CreatePriceTierCommand): CreatePriceTierCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      amount: cleanValueNumber(command?.amount),
      upTo: cleanValueNumber(command?.upTo),
      infinite: cleanValueBoolean(command?.infinite)
    });
  }
}
