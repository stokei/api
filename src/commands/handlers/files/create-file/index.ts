import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateFileCommand } from '@/commands/implements/files/create-file.command';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateFileRepository } from '@/repositories/files/create-file';

type CreateFileCommandKeys = keyof CreateFileCommand;

@CommandHandler(CreateFileCommand)
export class CreateFileCommandHandler
  implements ICommandHandler<CreateFileCommand>
{
  constructor(
    private readonly createFileRepository: CreateFileRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateFileCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateFileCommandKeys>('parent');
    }

    const fileCreated = await this.createFileRepository.execute(data);
    if (!fileCreated) {
      throw new FileNotFoundException();
    }
    const fileModel = this.publisher.mergeObjectContext(fileCreated);
    fileModel.createdFile();
    fileModel.commit();

    return fileCreated;
  }

  private clearData(command: CreateFileCommand): CreateFileCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
