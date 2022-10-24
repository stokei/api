import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveFeatureCommand } from '@/commands/implements/features/remove-feature.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  FeatureNotFoundException
} from '@/errors';
import { FindFeatureByIdRepository } from '@/repositories/features/find-feature-by-id';
import { RemoveFeatureRepository } from '@/repositories/features/remove-feature';

@CommandHandler(RemoveFeatureCommand)
export class RemoveFeatureCommandHandler
  implements ICommandHandler<RemoveFeatureCommand>
{
  constructor(
    private readonly findFeatureByIdRepository: FindFeatureByIdRepository,
    private readonly removeFeatureRepository: RemoveFeatureRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveFeatureCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const featureId = splitServiceId(data.where?.feature)?.id;
    if (!featureId) {
      throw new ParamNotFoundException('featureId');
    }

    const feature = await this.findFeatureByIdRepository.execute(featureId);
    if (!feature) {
      throw new FeatureNotFoundException();
    }

    const removed = await this.removeFeatureRepository.execute({
      where: {
        ...data.where,
        feature: featureId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const featureModel = this.publisher.mergeObjectContext(feature);
    featureModel.removedFeature({
      removedBy: data.where.removedBy
    });
    featureModel.commit();

    return feature;
  }

  private clearData(command: RemoveFeatureCommand): RemoveFeatureCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        feature: cleanValue(command?.where?.feature)
      })
    });
  }
}
