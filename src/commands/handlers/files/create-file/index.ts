import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateFileCommand } from '@/commands/implements/files/create-file.command';
import { DataNotFoundException, FileNotFoundException } from '@/errors';
import { FileModel } from '@/models/file.model';
import { CreateFileRepository } from '@/repositories/files/create-file';

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

    const initialStatus = FileModel.initialStatus({
      url: data.url,
      mimetype: data.mimetype
    });
    const fileCreated = await this.createFileRepository.execute({
      ...data,
      active: FileModel.initialActive({ status: initialStatus }),
      status: initialStatus
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
      size: cleanValueNumber(parseInt(command?.size as any)),
      duration: cleanValueNumber(parseInt(command?.duration as any)),
      url: cleanValue(command?.url)
    });
  }
}
