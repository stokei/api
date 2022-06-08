import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateVersionCommand } from '@/commands/implements/versions/create-version.command';
import {
  VersionNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateVersionRepository } from '@/repositories/versions/create-version';
import { cleanObject, cleanValue } from '@stokei/nestjs';

type CreateVersionCommandKeys = keyof CreateVersionCommand;

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler
  implements ICommandHandler<CreateVersionCommand>
{
  constructor(
    private readonly createVersionRepository: CreateVersionRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateVersionCommandKeys>('parent');
    }

    const versionCreated = await this.createVersionRepository.execute(data);
    if (!versionCreated) {
      throw new VersionNotFoundException();
    }
    const versionModel = this.publisher.mergeObjectContext(versionCreated);
    versionModel.createdVersion();
    versionModel.commit();

    return versionCreated;
  }

  private clearData(command: CreateVersionCommand): CreateVersionCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
