import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateComponentsTreeCommand } from '@/commands/implements/components/create-components-tree.command';
import { CreateComponentsTreeComponentDTO } from '@/dtos/components/create-components-tree.dto';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { CreateComponentService } from '@/services/components/create-component';

type CreateComponentsTreeCommandKeys = keyof CreateComponentsTreeCommand;

@CommandHandler(CreateComponentsTreeCommand)
export class CreateComponentsTreeCommandHandler
  implements ICommandHandler<CreateComponentsTreeCommand>
{
  constructor(
    private readonly createComponentService: CreateComponentService
  ) {}

  async execute(command: CreateComponentsTreeCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.tree?.length) {
      throw new ParamNotFoundException<CreateComponentsTreeCommandKeys>('tree');
    }

    const createComponent = async (
      component: CreateComponentsTreeComponentDTO
    ): Promise<ComponentModel> => {
      const componentCreated = await this.createComponentService.execute({
        ...component,
        app: data.app,
        createdBy: data.createdBy
      });
      const components = await Promise.all(
        (component?.components || [])?.map((component, index) =>
          createComponent({
            ...component,
            parent: componentCreated.id,
            order: index
          })
        )
      );
      return new ComponentModel({
        ...componentCreated,
        components
      });
    };

    const components = await Promise.all(
      (data?.tree || [])?.map((component, index) =>
        createComponent({ ...component, order: index })
      )
    );
    return components;
  }

  private clearData(
    command: CreateComponentsTreeCommand
  ): CreateComponentsTreeCommand {
    return cleanObject({
      tree: command?.tree,
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app)
    });
  }
}
