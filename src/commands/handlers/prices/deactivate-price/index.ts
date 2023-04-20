import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { DeactivatePriceCommand } from '@/commands/implements/prices/deactivate-price.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceCannotBeDisabledBecauseItIsTheDefaultException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { DeactivatePriceRepository } from '@/repositories/prices/deactivate-price';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';

type DeactivatePriceCommandKeys = keyof DeactivatePriceCommand;

@CommandHandler(DeactivatePriceCommand)
export class DeactivatePriceCommandHandler
  implements ICommandHandler<DeactivatePriceCommand>
{
  constructor(
    private readonly deactivatePriceRepository: DeactivatePriceRepository,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeactivatePriceCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.price) {
      throw new ParamNotFoundException<DeactivatePriceCommandKeys>('price');
    }
    const price = await this.findPriceByIdService.execute(data.price);
    if (!price) {
      throw new PriceNotFoundException();
    }
    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }
    if (product.defaultPrice === price.id) {
      throw new PriceCannotBeDisabledBecauseItIsTheDefaultException();
    }

    const priceDeactivated = await this.deactivatePriceRepository.execute({
      price: splitServiceId(price.id)?.id,
      updatedBy: data.updatedBy
    });
    if (!priceDeactivated) {
      throw new PriceNotFoundException();
    }

    const priceDeactivatedModel = new PriceModel({ ...price, active: false });
    const priceModel = this.publisher.mergeObjectContext(priceDeactivatedModel);
    priceModel.deactivatedPrice({
      updatedBy: data.updatedBy
    });
    priceModel.commit();

    return priceDeactivatedModel;
  }

  private clearData(command: DeactivatePriceCommand): DeactivatePriceCommand {
    return cleanObject({
      price: cleanValue(command?.price),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
