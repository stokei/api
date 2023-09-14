import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, OrderBy } from '@stokei/nestjs';

import { CreateVersionCommand } from '@/commands/implements/versions/create-version.command';
import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { VersionModel } from '@/models/version.model';
import { CreateVersionRepository } from '@/repositories/versions/create-version';
import { CloneComponentsTreeService } from '@/services/components/clone-components-tree';
import { UpdatePageService } from '@/services/pages/update-page';
import { FindAllVersionsService } from '@/services/versions/find-all-versions';

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler
  implements ICommandHandler<CreateVersionCommand>
{
  constructor(
    private readonly createVersionRepository: CreateVersionRepository,
    private readonly cloneComponentsTreeService: CloneComponentsTreeService,
    private readonly updatePageService: UpdatePageService,
    private readonly findAllVersionsService: FindAllVersionsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    let versionName = '1';
    let previousVersion: VersionModel;
    if (data.parent) {
      try {
        const versions = await this.findAllVersionsService.execute({
          where: {
            AND: {
              parent: {
                equals: data.parent
              },
              app: {
                equals: data.app
              }
            }
          },
          page: {
            limit: 1
          },
          orderBy: {
            createdAt: OrderBy.DESC
          }
        });
        if (!!versions?.totalCount) {
          const version = versions?.items?.[0];
          versionName = version?.name;
          previousVersion = version;
        }
      } catch (error) {}
    }

    const versionNumber = parseInt(versionName);
    if (isNaN(versionNumber)) {
      versionName = '1';
    } else {
      versionName = versionNumber + 1 + '';
    }

    const versionCreated = await this.createVersionRepository.execute({
      ...data,
      name: versionName
    });
    if (!versionCreated) {
      throw new VersionNotFoundException();
    }

    const versionModel = this.publisher.mergeObjectContext(versionCreated);
    versionModel.createdVersion({
      createdBy: data.createdBy
    });
    versionModel.commit();

    if (previousVersion) {
      await this.cloneComponentsTreeService.execute({
        app: data.app,
        currentParent: previousVersion.id,
        newParent: versionCreated.id,
        createdBy: data.createdBy
      });
    }
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

    return versionCreated;
  }

  private clearData(command: CreateVersionCommand): CreateVersionCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent)
    });
  }
}
