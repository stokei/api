import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateComponentCommand } from '@/commands/implements/components/create-component.command';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateComponentRepository } from '@/repositories/components/create-component';

type CreateComponentCommandKeys = keyof CreateComponentCommand;

@CommandHandler(CreateComponentCommand)
export class CreateComponentCommandHandler
  implements ICommandHandler<CreateComponentCommand>
{
  constructor(
    private readonly createComponentRepository: CreateComponentRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateComponentCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateComponentCommandKeys>('parent');
    }

    const componentCreated = await this.createComponentRepository.execute(data);
    if (!componentCreated) {
      throw new ComponentNotFoundException();
    }
    const componentModel = this.publisher.mergeObjectContext(componentCreated);
    componentModel.createdComponent({
      createdBy: data.createdBy
    });
    componentModel.commit();

    return componentCreated;
  }

  private clearData(command: CreateComponentCommand): CreateComponentCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      order: cleanValueNumber(command?.order),
      type: cleanValue(command?.type),
      data: command?.data || {}
    });
  }
}
