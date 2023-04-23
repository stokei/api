import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { ActivateFileCommand } from '@/commands/implements/files/activate-file.command';
import { ActivateFileRepositoryDataDTO } from '@/dtos/files/activate-file-repository.dto';
import { FileStatus } from '@/enums/file-status.enum';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { ActivateFileRepository } from '@/repositories/files/activate-file';
import { FindFileByIdService } from '@/services/files/find-file-by-id';

type ActivateFileCommandKeys = keyof ActivateFileCommand;

@CommandHandler(ActivateFileCommand)
export class ActivateFileCommandHandler
  implements ICommandHandler<ActivateFileCommand>
{
  constructor(
    private readonly activateFileRepository: ActivateFileRepository,
    private readonly findFileByIdService: FindFileByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivateFileCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.file) {
      throw new ParamNotFoundException<ActivateFileCommandKeys>('file');
    }
    const file = await this.findFileByIdService.execute(data.file);
    if (!file) {
      throw new FileNotFoundException();
    }

    const fileDataUpdated: ActivateFileRepositoryDataDTO = {
      active: true,
      status: FileStatus.ACTIVE,
      updatedBy: data.updatedBy
    };
    const updated = await this.activateFileRepository.execute({
      data: fileDataUpdated,
      where: {
        app: file.app,
        file: splitServiceId(file.id).id
      }
    });
    if (!updated) {
      throw new FileNotFoundException();
    }
    const fileUpdated = new FileModel({
      ...file,
      ...fileDataUpdated
    });
    const fileModel = this.publisher.mergeObjectContext(fileUpdated);
    fileModel.fileActivated({
      updatedBy: data.updatedBy
    });
    fileModel.commit();

    return fileUpdated;
  }

  private clearData(command: ActivateFileCommand): ActivateFileCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      file: cleanValue(command?.file)
    });
  }
}
