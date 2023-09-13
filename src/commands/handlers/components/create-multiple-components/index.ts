import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateMultipleComponentsCommand } from '@/commands/implements/components/create-multiple-components.command';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateMultipleComponentsRepository } from '@/repositories/components/create-multiple-components';

type CreateMultipleComponentsCommandKeys =
  keyof CreateMultipleComponentsCommand;

@CommandHandler(CreateMultipleComponentsCommand)
export class CreateMultipleComponentsCommandHandler
  implements ICommandHandler<CreateMultipleComponentsCommand>
{
  constructor(
    private readonly createMultipleComponentsRepository: CreateMultipleComponentsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateMultipleComponentsCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.components?.length) {
      throw new ParamNotFoundException<CreateMultipleComponentsCommandKeys>(
        'components'
      );
    }

    const componentCreated =
      await this.createMultipleComponentsRepository.execute(data?.components);
    if (!componentCreated) {
      throw new ComponentNotFoundException();
    }
    return componentCreated;
  }

  private clearData(
    command: CreateMultipleComponentsCommand
  ): CreateMultipleComponentsCommand {
    return cleanObject({
      components: command?.components?.map((component) => ({
        createdBy: cleanValue(component?.createdBy),
        app: cleanValue(component?.app),
        parent: cleanValue(component?.parent),
        type: cleanValue(component?.type),
        data: component?.data
      }))
    });
  }
}
