import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveComponentCommand } from '@/commands/implements/components/remove-component.command';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindComponentByIdRepository } from '@/repositories/components/find-component-by-id';
import { RemoveComponentRepository } from '@/repositories/components/remove-component';

@CommandHandler(RemoveComponentCommand)
export class RemoveComponentCommandHandler
  implements ICommandHandler<RemoveComponentCommand>
{
  constructor(
    private readonly findComponentByIdRepository: FindComponentByIdRepository,
    private readonly removeComponentRepository: RemoveComponentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveComponentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
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

    const removed = await this.removeComponentRepository.execute({
      where: {
        ...data.where,
        component: componentId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const componentModel = this.publisher.mergeObjectContext(component);
    componentModel.removedComponent({
      removedBy: data.where.removedBy
    });
    componentModel.commit();

    return component;
  }

  private clearData(command: RemoveComponentCommand): RemoveComponentCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        component: cleanValue(command?.where?.component)
      })
    });
  }
}
