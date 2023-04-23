import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateFeatureCommand } from '@/commands/implements/features/update-feature.command';
import {
  DataNotFoundException,
  FeatureNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { UpdateFeatureRepository } from '@/repositories/features/update-feature';
import { FindFeatureByIdService } from '@/services/features/find-feature-by-id';

@CommandHandler(UpdateFeatureCommand)
export class UpdateFeatureCommandHandler
  implements ICommandHandler<UpdateFeatureCommand>
{
  constructor(
    private readonly findFeatureByIdService: FindFeatureByIdService,
    private readonly updateFeatureRepository: UpdateFeatureRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateFeatureCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const featureId = splitServiceId(data.where?.feature)?.id;
    if (!featureId) {
      throw new ParamNotFoundException('featureId');
    }

    const feature = await this.findFeatureByIdService.execute(featureId);
    if (!feature) {
      throw new FeatureNotFoundException();
    }

    const updated = await this.updateFeatureRepository.execute({
      ...data,
      where: {
        ...data.where,
        feature: featureId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const featureUpdated = await this.findFeatureByIdService.execute(featureId);
    if (!featureUpdated) {
      throw new FeatureNotFoundException();
    }
    const featureModel = this.publisher.mergeObjectContext(featureUpdated);
    featureModel.updatedFeature({
      updatedBy: data.data.updatedBy
    });
    featureModel.commit();

    return featureUpdated;
  }

  private clearData(command: UpdateFeatureCommand): UpdateFeatureCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        feature: cleanValue(command?.where?.feature)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        description: cleanValue(command?.data?.description),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
