import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemovePriceTierCommand } from '@/commands/implements/price-tiers/remove-price-tier.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceTierNotFoundException
} from '@/errors';
import { FindPriceTierByIdRepository } from '@/repositories/price-tiers/find-price-tier-by-id';
import { RemovePriceTierRepository } from '@/repositories/price-tiers/remove-price-tier';

@CommandHandler(RemovePriceTierCommand)
export class RemovePriceTierCommandHandler
  implements ICommandHandler<RemovePriceTierCommand>
{
  constructor(
    private readonly findPriceTierByIdRepository: FindPriceTierByIdRepository,
    private readonly removePriceTierRepository: RemovePriceTierRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemovePriceTierCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const priceTierId = splitServiceId(data.where?.priceTier)?.id;
    if (!priceTierId) {
      throw new ParamNotFoundException('priceTierId');
    }

    const priceTier = await this.findPriceTierByIdRepository.execute(
      priceTierId
    );
    if (!priceTier) {
      throw new PriceTierNotFoundException();
    }

    const removed = await this.removePriceTierRepository.execute({
      where: {
        ...data.where,
        priceTier: priceTierId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const priceTierModel = this.publisher.mergeObjectContext(priceTier);
    priceTierModel.removedPriceTier({
      removedBy: data.where.removedBy
    });
    priceTierModel.commit();

    return priceTier;
  }

  private clearData(command: RemovePriceTierCommand): RemovePriceTierCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        priceTier: cleanValue(command?.where?.priceTier)
      })
    });
  }
}
