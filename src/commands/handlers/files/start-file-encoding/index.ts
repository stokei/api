import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { StartFileEncodingCommand } from '@/commands/implements/files/start-file-encoding.command';
import { StartFileEncodingRepositoryDataDTO } from '@/dtos/files/start-file-encoding-repository.dto';
import { FileStatus } from '@/enums/file-status.enum';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { StartFileEncodingRepository } from '@/repositories/files/start-file-encoding';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { QencodeCreateVideoEncodingService } from '@/services/qencode/qencode-create-video-encoding';

type StartFileEncodingCommandKeys = keyof StartFileEncodingCommand;

@CommandHandler(StartFileEncodingCommand)
export class StartFileEncodingCommandHandler
  implements ICommandHandler<StartFileEncodingCommand>
{
  constructor(
    private readonly startFileEncodingRepository: StartFileEncodingRepository,
    private readonly findFileByIdService: FindFileByIdService,
    private readonly qencodeCreateVideoEncodingService: QencodeCreateVideoEncodingService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: StartFileEncodingCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.file) {
      throw new ParamNotFoundException<StartFileEncodingCommandKeys>('file');
    }
    const file = await this.findFileByIdService.execute(data.file);
    if (!file) {
      throw new FileNotFoundException();
    }

    const taskQencodeFile =
      await this.qencodeCreateVideoEncodingService.execute({
        video: {
          id: file.id,
          filename: file.filename,
          url: file.url
        }
      });
    if (!taskQencodeFile) {
      throw new FileNotFoundException();
    }

    const fileDataUpdated: StartFileEncodingRepositoryDataDTO = {
      active: false,
      status: FileStatus.ENCODING,
      updatedBy: data.updatedBy
    };
    const updated = await this.startFileEncodingRepository.execute({
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
    fileModel.fileEncodingStarted({
      updatedBy: data.updatedBy
    });
    fileModel.commit();

    return fileUpdated;
  }

  private clearData(
    command: StartFileEncodingCommand
  ): StartFileEncodingCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      file: cleanValue(command?.file)
    });
  }
}
