import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { PublishVersionCommand } from '@/commands/implements/versions/publish-version.command';
import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { UpdatePageService } from '@/services/pages/update-page';
import { FindVersionByIdService } from '@/services/versions/find-version-by-id';

@CommandHandler(PublishVersionCommand)
export class PublishVersionCommandHandler
  implements ICommandHandler<PublishVersionCommand>
{
  constructor(
    private readonly findVersionByIdService: FindVersionByIdService,
    private readonly updatePageService: UpdatePageService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: PublishVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    const versionPublished = await this.findVersionByIdService.execute(
      data.version
    );
    if (!versionPublished) {
      throw new VersionNotFoundException();
    }

    await this.updatePageService.execute({
      data: {
        version: versionPublished.id,
        draftVersion: versionPublished.id,
        updatedBy: data.createdBy
      },
      where: {
        app: data.app,
        page: versionPublished.parent
      }
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
