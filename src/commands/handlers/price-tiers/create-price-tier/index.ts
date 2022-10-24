import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

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
    if (!data?.name) {
      throw new ParamNotFoundException<CreatePriceTierCommandKeys>('name');
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreatePriceTierCommandKeys>('file');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const priceTierCreated = await this.createPriceTierRepository.execute({
      ...data,
      active: false,
      slug
    });
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
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      file: cleanValue(command?.file),
      poster: cleanValue(command?.poster),
      parent: cleanValue(command?.parent)
    });
  }
}
