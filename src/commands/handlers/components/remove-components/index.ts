import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { splitServiceId } from '@stokei/nestjs';

import { RemoveComponentsCommand } from '@/commands/implements/components/remove-components.command';
import { ComponentsNotFoundException, ParamNotFoundException } from '@/errors';
import { RemoveComponentsRepository } from '@/repositories/components/remove-components';

@CommandHandler(RemoveComponentsCommand)
export class RemoveComponentsCommandHandler
  implements ICommandHandler<RemoveComponentsCommand>
{
  constructor(
    private readonly removeComponentsRepository: RemoveComponentsRepository
  ) {}

  async execute(command: RemoveComponentsCommand) {
    if (!command?.ids?.length) {
      throw new ParamNotFoundException('removedBy');
    }
    const ids = command.ids
      .map((id) => splitServiceId(id)?.id)
      ?.filter(Boolean);
    if (!ids?.length) {
      throw new ParamNotFoundException('ids');
    }

    const removed = await this.removeComponentsRepository.execute(ids);
    if (!removed) {
      throw new ComponentsNotFoundException();
    }
    return true;
  }
}
