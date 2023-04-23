import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { ActivatePriceCommand } from '@/commands/implements/prices/activate-price.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { ActivatePriceRepository } from '@/repositories/prices/activate-price';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';

type ActivatePriceCommandKeys = keyof ActivatePriceCommand;

@CommandHandler(ActivatePriceCommand)
export class ActivatePriceCommandHandler
  implements ICommandHandler<ActivatePriceCommand>
{
  constructor(
    private readonly activatePriceRepository: ActivatePriceRepository,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.price) {
      throw new ParamNotFoundException<ActivatePriceCommandKeys>('price');
    }
    const price = await this.findPriceByIdService.execute(data.price);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const priceActivated = await this.activatePriceRepository.execute({
      price: splitServiceId(price.id)?.id,
      updatedBy: data.updatedBy
    });
    if (!priceActivated) {
      throw new PriceNotFoundException();
    }

    const priceActivatedModel = new PriceModel({ ...price, active: true });
    const priceModel = this.publisher.mergeObjectContext(priceActivatedModel);
    priceModel.activatedPrice({
      updatedBy: data.updatedBy
    });
    priceModel.commit();

    return priceActivatedModel;
  }

  private clearData(command: ActivatePriceCommand): ActivatePriceCommand {
    return cleanObject({
      price: cleanValue(command?.price),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
