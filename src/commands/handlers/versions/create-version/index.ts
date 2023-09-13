import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, OrderBy } from '@stokei/nestjs';

import { CreateVersionCommand } from '@/commands/implements/versions/create-version.command';
import { DataNotFoundException, VersionNotFoundException } from '@/errors';
import { CreateVersionRepository } from '@/repositories/versions/create-version';
import { FindAllVersionsService } from '@/services/versions/find-all-versions';

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler
  implements ICommandHandler<CreateVersionCommand>
{
  constructor(
    private readonly createVersionRepository: CreateVersionRepository,
    private readonly findAllVersionsService: FindAllVersionsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateVersionCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }

    let versionName = '1';
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
          versionName = versions?.items?.[0]?.name;
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
