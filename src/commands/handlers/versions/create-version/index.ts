import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateVersionCommand } from '@/commands/implements/versions/create-version.command';
import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { CreateVersionRepository } from '@/repositories/versions/create-version';
import { CloneComponentsTreeService } from '@/services/components/clone-components-tree';
import { FindPageByIdService } from '@/services/pages/find-page-by-id';
import { UpdatePageService } from '@/services/pages/update-page';

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler
  implements ICommandHandler<CreateVersionCommand>
{
  constructor(
    private readonly createVersionRepository: CreateVersionRepository,
    private readonly findPageByIdService: FindPageByIdService,
    private readonly cloneComponentsTreeService: CloneComponentsTreeService,
    private readonly updatePageService: UpdatePageService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    let previousVersionId: string;
    if (data.parent) {
      try {
        const page = await this.findPageByIdService.execute(data.parent);
        if (!!page?.version) {
          previousVersionId = page.version;
        }
      } catch (error) {}
    }

    const versionCreated = await this.createVersionRepository.execute(data);
    if (!versionCreated) {
      throw new VersionNotFoundException();
    }

    const versionModel = this.publisher.mergeObjectContext(versionCreated);
    versionModel.createdVersion({
      createdBy: data.createdBy
    });
    versionModel.commit();

    if (previousVersionId) {
      await this.cloneComponentsTreeService.execute({
        app: data.app,
        currentParent: previousVersionId,
        newParent: versionCreated.id,
        createdBy: data.createdBy
      });
    }
    if (data.parent) {
      await this.updatePageService.execute({
        data: {
          draftVersion: versionCreated.id,
          updatedBy: data.createdBy
        },
        where: {
          app: data.app,
          page: data.parent
        }
      });
    }
    return versionCreated;
  }

  private clearData(command: CreateVersionCommand): CreateVersionCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      name: cleanValue(command?.name),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent)
    });
  }
}
