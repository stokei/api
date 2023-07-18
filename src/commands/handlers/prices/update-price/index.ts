import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdatePriceCommand } from '@/commands/implements/prices/update-price.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { FindPriceByIdRepository } from '@/repositories/prices/find-price-by-id';
import { UpdatePriceRepository } from '@/repositories/prices/update-price';

@CommandHandler(UpdatePriceCommand)
export class UpdatePriceCommandHandler
  implements ICommandHandler<UpdatePriceCommand>
{
  constructor(
    private readonly findPriceByIdRepository: FindPriceByIdRepository,
    private readonly updatePriceRepository: UpdatePriceRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const priceId = splitServiceId(data.where?.price)?.id;
    if (!priceId) {
      throw new ParamNotFoundException('priceId');
    }

    const price = await this.findPriceByIdRepository.execute(priceId);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const updated = await this.updatePriceRepository.execute({
      ...data,
      where: {
        ...data.where,
        price: priceId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const priceUpdated = await this.findPriceByIdRepository.execute(priceId);
    if (!priceUpdated) {
      throw new PriceNotFoundException();
    }
    const priceModel = this.publisher.mergeObjectContext(priceUpdated);
    priceModel.updatedPrice({
      updatedBy: data.data.updatedBy
    });
    priceModel.commit();

    return priceUpdated;
  }

  private clearData(command: UpdatePriceCommand): UpdatePriceCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        price: cleanValue(command?.where?.price)
      }),
      data: cleanObject({
        fromPrice: cleanValueNumber(command?.data?.fromPrice),
        quantity: cleanValueNumber(command?.data?.quantity),
        automaticRenew: cleanValueBoolean(command?.data?.automaticRenew),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
