import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveFileCommand } from '@/commands/implements/files/remove-file.command';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindFileByIdRepository } from '@/repositories/files/find-file-by-id';
import { RemoveFileRepository } from '@/repositories/files/remove-file';

type RemoveFileCommandKeys = keyof RemoveFileCommand;

@CommandHandler(RemoveFileCommand)
export class RemoveFileCommandHandler
  implements ICommandHandler<RemoveFileCommand>
{
  constructor(
    private readonly findFileByIdRepository: FindFileByIdRepository,
    private readonly removeFileRepository: RemoveFileRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveFileCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const fileId = splitServiceId(data.where?.fileId)?.id;
    if (!fileId) {
      throw new ParamNotFoundException('fileId');
    }

    const file = await this.findFileByIdRepository.execute(fileId);
    if (!file) {
      throw new FileNotFoundException();
    }

    const removed = await this.removeFileRepository.execute({
      where: {
        fileId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const fileModel = this.publisher.mergeObjectContext(file);
    fileModel.removedFile();
    fileModel.commit();

    return file;
  }

  private clearData(command: RemoveFileCommand): RemoveFileCommand {
    return cleanObject({
      where: cleanObject({
        fileId: cleanValue(command?.where?.fileId)
      })
    });
  }
}
