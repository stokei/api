import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePluginCommand } from '@/commands/implements/plugins/create-plugin.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PluginNotFoundException
} from '@/errors';
import { PluginModel } from '@/models/plugin.model';
import { CreatePluginRepository } from '@/repositories/plugins/create-plugin';
import { FindPluginByTypeService } from '@/services/plugins/find-plugin-by-type';
import { UpdatePluginService } from '@/services/plugins/update-plugin';

type CreatePluginCommandKeys = keyof CreatePluginCommand;

@CommandHandler(CreatePluginCommand)
export class CreatePluginCommandHandler
  implements ICommandHandler<CreatePluginCommand>
{
  constructor(
    private readonly createPluginRepository: CreatePluginRepository,
    private readonly updatePluginService: UpdatePluginService,
    private readonly findPluginByTypeService: FindPluginByTypeService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePluginCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreatePluginCommandKeys>('parent');
    }
    if (!data?.type) {
      throw new ParamNotFoundException<CreatePluginCommandKeys>('type');
    }
    if (!data?.publicKey) {
      throw new ParamNotFoundException<CreatePluginCommandKeys>('publicKey');
    }
    if (!data?.privateKey) {
      throw new ParamNotFoundException<CreatePluginCommandKeys>('privateKey');
    }

    let plugin: PluginModel;
    try {
      plugin = await this.findPluginByTypeService.execute({
        app: data.app,
        parent: data.parent,
        type: data.type
      });
      if (!plugin) {
        throw new PluginNotFoundException();
      }
      return await this.updatePluginService.execute({
        data: {
          publicKey: data.publicKey,
          privateKey: data.privateKey,
          updatedBy: data.createdBy
        },
        where: {
          plugin: plugin.id
        }
      });
    } catch (error) {
      const pluginCreated = await this.createPluginRepository.execute(data);
      if (!pluginCreated) {
        throw new PluginNotFoundException();
      }
      const pluginModel = this.publisher.mergeObjectContext(pluginCreated);
      pluginModel.commit();

      return pluginCreated;
    }
  }

  private clearData(command: CreatePluginCommand): CreatePluginCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      publicKey: cleanValue(command?.publicKey),
      privateKey: cleanValue(command?.privateKey),
      type: cleanValue(command?.type)
    });
  }
}
