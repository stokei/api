import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateComponentCommand } from '@/commands/implements/components/update-component.command';
import { UpdateComponentDataDTO } from '@/dtos/components/update-component.dto';
import {
  ComponentNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ComponentModel } from '@/models/component.model';
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

    const dataUpdated: UpdateComponentDataDTO = {
      ...data?.data,
      data: {
        ...component?.data,
        ...data?.data?.data
      }
    };
    const updated = await this.updateComponentRepository.execute({
      data: dataUpdated,
      where: {
        ...data.where,
        component: componentId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const componentUpdated = new ComponentModel({
      ...component,
      ...dataUpdated
    });
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
        order: cleanValueNumber(command?.data?.order),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
