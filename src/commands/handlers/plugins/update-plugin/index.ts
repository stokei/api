import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdatePluginCommand } from '@/commands/implements/plugins/update-plugin.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PluginNotFoundException
} from '@/errors';
import { PluginModel } from '@/models/plugin.model';
import { UpdatePluginRepository } from '@/repositories/plugins/update-plugin';
import { FindPluginByIdService } from '@/services/plugins/find-plugin-by-id';

@CommandHandler(UpdatePluginCommand)
export class UpdatePluginCommandHandler
  implements ICommandHandler<UpdatePluginCommand>
{
  constructor(
    private readonly findPluginByIdService: FindPluginByIdService,
    private readonly updatePluginRepository: UpdatePluginRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdatePluginCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const pluginId = splitServiceId(data.where?.plugin)?.id;
    if (!pluginId) {
      throw new ParamNotFoundException('pluginId');
    }

    const plugin = await this.findPluginByIdService.execute(data.where?.plugin);
    if (!plugin) {
      throw new PluginNotFoundException();
    }

    const updated = await this.updatePluginRepository.execute({
      ...data,
      where: {
        ...data.where,
        plugin: pluginId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const pluginUpdated = new PluginModel({ ...plugin, ...data?.data });
    const pluginModel = this.publisher.mergeObjectContext(pluginUpdated);
    pluginModel.commit();

    return pluginUpdated;
  }

  private clearData(command: UpdatePluginCommand): UpdatePluginCommand {
    return cleanObject({
      where: cleanObject({
        plugin: cleanValue(command?.where?.plugin)
      }),
      data: cleanObject({
        publicKey: cleanValue(command?.data?.publicKey),
        privateKey: cleanValue(command?.data?.privateKey),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
