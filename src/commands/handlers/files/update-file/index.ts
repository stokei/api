import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateFileCommand } from '@/commands/implements/files/update-file.command';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindFileByIdRepository } from '@/repositories/files/find-file-by-id';
import { UpdateFileRepository } from '@/repositories/files/update-file';

@CommandHandler(UpdateFileCommand)
export class UpdateFileCommandHandler
  implements ICommandHandler<UpdateFileCommand>
{
  constructor(
    private readonly findFileByIdRepository: FindFileByIdRepository,
    private readonly updateFileRepository: UpdateFileRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateFileCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const fileId = splitServiceId(data.where?.file)?.id;
    if (!fileId) {
      throw new ParamNotFoundException('fileId');
    }

    const file = await this.findFileByIdRepository.execute(fileId);
    if (!file) {
      throw new FileNotFoundException();
    }

    const updated = await this.updateFileRepository.execute({
      ...data,
      where: {
        ...data.where,
        file: fileId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const fileUpdated = await this.findFileByIdRepository.execute(fileId);
    if (!fileUpdated) {
      throw new FileNotFoundException();
    }
    const fileModel = this.publisher.mergeObjectContext(fileUpdated);
    fileModel.updatedFile({
      updatedBy: data.data.updatedBy
    });
    fileModel.commit();

    return fileUpdated;
  }

  private clearData(command: UpdateFileCommand): UpdateFileCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        file: cleanValue(command?.where?.file)
      }),
      data: cleanObject({
        filename: cleanValue(command?.data?.filename),
        extension: cleanValue(command?.data?.extension),
        mimetype: cleanValue(command?.data?.mimetype),
        size: cleanValueNumber(command?.data?.size),
        duration: cleanValueNumber(command?.data?.duration),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
