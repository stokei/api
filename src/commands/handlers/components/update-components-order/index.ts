import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueOrValues } from '@stokei/nestjs';

import { UpdateComponentsOrderCommand } from '@/commands/implements/components/update-components-order.command';
import { DataNotFoundException } from '@/errors';
import { UpdateComponentService } from '@/services/components/update-component';

@CommandHandler(UpdateComponentsOrderCommand)
export class UpdateComponentsOrderCommandHandler
  implements ICommandHandler<UpdateComponentsOrderCommand>
{
  constructor(
    private readonly updateComponentService: UpdateComponentService
  ) {}

  async execute(command: UpdateComponentsOrderCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    return await Promise.all(
      data?.components?.map((component, order) =>
        this.updateComponentService.execute({
          data: {
            order,
            updatedBy: data.updatedBy
          },
          where: {
            component,
            app: data.app
          }
        })
      )
    );
  }

  private clearData(
    command: UpdateComponentsOrderCommand
  ): UpdateComponentsOrderCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      components: cleanValueOrValues(command?.components),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
