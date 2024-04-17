import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { PublishVersionCommand } from '@/commands/implements/versions/publish-version.command';
import { PublishVersionRepositoryDTO } from '@/dtos/versions/publish-version-repository.dto';
import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { VersionModel } from '@/models/version.model';
import { PublishVersionRepository } from '@/repositories/versions/publish-version';
import { UpdatePageService } from '@/services/pages/update-page';
import { FindVersionByIdService } from '@/services/versions/find-version-by-id';

@CommandHandler(PublishVersionCommand)
export class PublishVersionCommandHandler
  implements ICommandHandler<PublishVersionCommand>
{
  constructor(
    private readonly findVersionByIdService: FindVersionByIdService,
    private readonly publishVersionRepository: PublishVersionRepository,
    private readonly updatePageService: UpdatePageService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: PublishVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    const version = await this.findVersionByIdService.execute(data.version);
    if (!version) {
      throw new VersionNotFoundException();
    }

    await this.updatePageService.execute({
      data: {
        version: version.id,
        draftVersion: version.id,
        updatedBy: data.createdBy
      },
      where: {
        app: data.app,
        page: version.parent
      }
    });

    const dataPublished: PublishVersionRepositoryDTO = {
      app: data.app,
      published: true,
      version: splitServiceId(version?.id)?.id,
      createdBy: data.createdBy
    };
    const versionWasPublished =
      await this.publishVersionRepository.execute(dataPublished);
    if (!versionWasPublished) {
      throw new VersionNotFoundException();
    }

    const versionPublished = new VersionModel({
      ...version,
      ...dataPublished
    });
    const versionModel = this.publisher.mergeObjectContext(versionPublished);
    versionModel.createdVersion({
      createdBy: data.createdBy
    });
    versionModel.commit();

    return versionPublished;
  }

  private clearData(command: PublishVersionCommand): PublishVersionCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      version: cleanValue(command?.version),
      app: cleanValue(command?.app)
    });
  }
}
