import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateFileCommand } from '@/commands/implements/files/create-file.command';
import { FileStatus } from '@/enums/file-status.enum';
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
    if (!data?.filename) {
      throw new ParamNotFoundException<CreateFileCommandKeys>('filename');
    }
    if (!data?.mimetype) {
      throw new ParamNotFoundException<CreateFileCommandKeys>('mimetype');
    }

    const fileCreated = await this.createFileRepository.execute({
      ...data,
      active: false,
      status: FileStatus.PENDING
    });
    if (!fileCreated) {
      throw new FileNotFoundException();
    }
    const fileModel = this.publisher.mergeObjectContext(fileCreated);
    fileModel.createdFile({
      createdBy: data.createdBy
    });
    fileModel.commit();

    return fileCreated;
  }

  private clearData(command: CreateFileCommand): CreateFileCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      filename: cleanValue(command?.filename),
      extension: cleanValue(command?.extension),
      mimetype: cleanValue(command?.mimetype),
      size: cleanValueNumber(command?.size),
      url: cleanValue(command?.url)
    });
  }
}
