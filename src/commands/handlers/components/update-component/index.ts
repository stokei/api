import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateComponentCommand } from '@/commands/implements/components/update-component.command';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindComponentByIdRepository } from '@/repositories/components/find-component-by-id';
import { UpdateComponentRepository } from '@/repositories/components/update-component';

@CommandHandler(UpdateComponentCommand)
export class UpdateComponentCommandHandler
  implements ICommandHandler<UpdateComponentCommand>
{
  constructor(
    private readonly findComponentByIdRepository: FindComponentByIdRepository,
    private readonly updateComponentRepository: UpdateComponentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateComponentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const componentId = splitServiceId(data.where?.component)?.id;
    if (!componentId) {
      throw new ParamNotFoundException('componentId');
    }

    const component = await this.findComponentByIdRepository.execute(
      componentId
    );
    if (!component) {
      throw new ComponentNotFoundException();
    }

    const updated = await this.updateComponentRepository.execute({
      ...data,
      where: {
        ...data.where,
        component: componentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const componentUpdated = await this.findComponentByIdRepository.execute(
      componentId
    );
    if (!componentUpdated) {
      throw new ComponentNotFoundException();
    }
    const componentModel = this.publisher.mergeObjectContext(componentUpdated);
    componentModel.updatedComponent({
      updatedBy: data.data.updatedBy
    });
    componentModel.commit();

    return componentUpdated;
  }

  private clearData(command: UpdateComponentCommand): UpdateComponentCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        component: cleanValue(command?.where?.component)
      }),
      data: cleanObject({
        data: command?.data?.data,
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
