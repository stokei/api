import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  OrderBy
} from '@stokei/nestjs';

import { CreateComponentCommand } from '@/commands/implements/components/create-component.command';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateComponentRepository } from '@/repositories/components/create-component';
import { FindAllComponentsService } from '@/services/components/find-all-components';

type CreateComponentCommandKeys = keyof CreateComponentCommand;

@CommandHandler(CreateComponentCommand)
export class CreateComponentCommandHandler
  implements ICommandHandler<CreateComponentCommand>
{
  constructor(
    private readonly createComponentRepository: CreateComponentRepository,
    private readonly findAllComponentsService: FindAllComponentsService,
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

    let order = data.order >= 0 ? data.order : 1;
    if (!data.order || data.order < 0) {
      try {
        const componentsFromParent =
          await this.findAllComponentsService.execute({
            orderBy: {
              order: OrderBy.DESC
            },
            page: {
              limit: 1
            },
            where: {
              AND: {
                parent: {
                  equals: data.parent
                },
                app: {
                  equals: data.app
                }
              }
            }
          });
        if (componentsFromParent?.totalCount) {
          order = componentsFromParent?.totalCount + 1;
        }
      } catch (error) {}
    }
    const componentCreated = await this.createComponentRepository.execute({
      ...data,
      data: data?.data || {},
      order
    });
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
