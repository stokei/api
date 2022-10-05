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
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const fileId = splitServiceId(data.where?.file)?.id;
    if (!fileId) {
      throw new ParamNotFoundException('fileId');
    }

    const file = await this.findFileByIdRepository.execute(fileId);
    if (!file) {
      throw new FileNotFoundException();
    }

    const removed = await this.removeFileRepository.execute({
      where: {
        ...data.where,
        file: fileId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const fileModel = this.publisher.mergeObjectContext(file);
    fileModel.removedFile({
      removedBy: data.where.removedBy
    });
    fileModel.commit();

    return file;
  }

  private clearData(command: RemoveFileCommand): RemoveFileCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        file: cleanValue(command?.where?.file)
      })
    });
  }
}
