import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateFeatureCommand } from '@/commands/implements/features/create-feature.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  FeatureNotFoundException
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
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('name');
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreateFeatureCommandKeys>('file');
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const featureCreated = await this.createFeatureRepository.execute({
      ...data,
      active: false,
      slug
    });
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
