import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePriceTierCommand } from '@/commands/implements/price-tiers/update-price-tier.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceTierNotFoundException
} from '@/errors';
import { FindPriceTierByIdRepository } from '@/repositories/price-tiers/find-price-tier-by-id';
import { UpdatePriceTierRepository } from '@/repositories/price-tiers/update-price-tier';

@CommandHandler(UpdatePriceTierCommand)
export class UpdatePriceTierCommandHandler
  implements ICommandHandler<UpdatePriceTierCommand>
{
  constructor(
    private readonly findPriceTierByIdRepository: FindPriceTierByIdRepository,
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

    const priceTier = await this.findPriceTierByIdRepository.execute(
      priceTierId
    );
    if (!priceTier) {
      throw new PriceTierNotFoundException();
    }

    const updated = await this.updatePriceTierRepository.execute({
      ...data,
      where: {
        ...data.where,
        priceTier: priceTierId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const priceTierUpdated = await this.findPriceTierByIdRepository.execute(
      priceTierId
    );
    if (!priceTierUpdated) {
      throw new PriceTierNotFoundException();
    }
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
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        poster: cleanValue(command?.data?.poster),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
