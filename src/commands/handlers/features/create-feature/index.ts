import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateFeatureCommand } from '@/commands/implements/features/create-feature.command';
import {
  DataNotFoundException,
  FeatureNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateFeatureRepository } from '@/repositories/features/create-feature';

type CreateFeatureCommandKeys = keyof CreateFeatureCommand;

@CommandHandler(CreateFeatureCommand)
export class CreateFeatureCommandHandler
  implements ICommandHandler<CreateFeatureCommand>
{
  constructor(
    private readonly createFeatureRepository: CreateFeatureRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateFeatureCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.parent) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('parent');
    }
    if (!data.name) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('name');
    }
    if (!data.app) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('app');
    }
    if (!data.createdBy) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('createdBy');
    }
    const featureCreated = await this.createFeatureRepository.execute(data);
    if (!featureCreated) {
      throw new FeatureNotFoundException();
    }
    const featureModel = this.publisher.mergeObjectContext(featureCreated);
    featureModel.createdFeature({
      createdBy: data.createdBy
    });
    featureModel.commit();

    return featureCreated;
  }

  private clearData(command: CreateFeatureCommand): CreateFeatureCommand {
    return cleanObject({
      parent: cleanValue(command?.parent),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
