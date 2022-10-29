import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdatePriceTierCommand } from '@/commands/implements/price-tiers/update-price-tier.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceTierNotFoundException
} from '@/errors';
import { PriceTierModel } from '@/models/price-tier.model';
import { UpdatePriceTierRepository } from '@/repositories/price-tiers/update-price-tier';
import { FindPriceTierByIdService } from '@/services/price-tiers/find-price-tier-by-id';

@CommandHandler(UpdatePriceTierCommand)
export class UpdatePriceTierCommandHandler
  implements ICommandHandler<UpdatePriceTierCommand>
{
  constructor(
    private readonly findPriceTierByIdService: FindPriceTierByIdService,
    private readonly updatePriceTierRepository: UpdatePriceTierRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePriceTierCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const priceTierId = splitServiceId(data.where?.priceTier)?.id;
    if (!priceTierId) {
      throw new ParamNotFoundException('priceTierId');
    }

    const priceTier = await this.findPriceTierByIdService.execute(
      data.where?.priceTier
    );
    if (!priceTier) {
      throw new PriceTierNotFoundException();
    }
    const dataUpdated = data.data;
    const updated = await this.updatePriceTierRepository.execute({
      data: dataUpdated,
      where: {
        ...data.where,
        priceTier: priceTierId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const priceTierUpdated = new PriceTierModel({
      ...priceTier,
      ...dataUpdated
    });
    const priceTierModel = this.publisher.mergeObjectContext(priceTierUpdated);
    priceTierModel.updatedPriceTier({
      updatedBy: data.data.updatedBy
    });
    priceTierModel.commit();

    return priceTierUpdated;
  }

  private clearData(command: UpdatePriceTierCommand): UpdatePriceTierCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        priceTier: cleanValue(command?.where?.priceTier)
      }),
      data: cleanObject({
        amount: cleanValueNumber(command?.data?.amount),
        upTo: cleanValueNumber(command?.data?.upTo),
        infinite: cleanValueBoolean(command?.data?.infinite),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
