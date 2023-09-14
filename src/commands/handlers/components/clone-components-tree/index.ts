import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CloneComponentsTreeCommand } from '@/commands/implements/components/clone-components-tree.command';
import { DataNotFoundException, ParamNotFoundException } from '@/errors';
import { ComponentModel } from '@/models/component.model';
import { CreateComponentService } from '@/services/components/create-component';
import { FindAllComponentsTreeService } from '@/services/components/find-all-components-tree';

type CloneComponentsTreeCommandKeys = keyof CloneComponentsTreeCommand;

@CommandHandler(CloneComponentsTreeCommand)
export class CloneComponentsTreeCommandHandler
  implements ICommandHandler<CloneComponentsTreeCommand>
{
  constructor(
    private readonly createComponentService: CreateComponentService,
    private readonly findAllComponentsTreeService: FindAllComponentsTreeService
  ) {}

  async execute(command: CloneComponentsTreeCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.currentParent) {
      throw new ParamNotFoundException<CloneComponentsTreeCommandKeys>(
        'currentParent'
      );
    }
    if (!data?.newParent) {
      throw new ParamNotFoundException<CloneComponentsTreeCommandKeys>(
        'newParent'
      );
    }
    const componentsTree = await this.findAllComponentsTreeService.execute({
      app: data.app,
      parent: data.currentParent
    });
    if (!componentsTree?.length) {
      return;
    }

    const cloneComponent = async (
      component: ComponentModel,
      newParent: string
    ) => {
      const componentCreated = await this.createComponentService.execute({
        app: data.app,
        parent: newParent,
        order: component.order,
        type: component.type,
        data: component.data,
        createdBy: data.createdBy
      });
      return new ComponentModel({
        ...componentCreated,
        components: component?.components?.map((component) =>
          cloneComponent(component, componentCreated.id)
        )
      });
    };

    return componentsTree?.map((component) =>
      cloneComponent(component, data.newParent)
    );
  }

  private clearData(
    command: CloneComponentsTreeCommand
  ): CloneComponentsTreeCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      currentParent: cleanValue(command?.currentParent),
      newParent: cleanValue(command?.newParent)
    });
  }
}
