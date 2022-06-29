import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { UpdateDomainCommand } from '@/commands/implements/domains/update-domain.command';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindDomainByIdRepository } from '@/repositories/domains/find-domain-by-id';
import { UpdateDomainRepository } from '@/repositories/domains/update-domain';

type UpdateDomainCommandKeys = keyof UpdateDomainCommand;

@CommandHandler(UpdateDomainCommand)
export class UpdateDomainCommandHandler
  implements ICommandHandler<UpdateDomainCommand>
{
  constructor(
    private readonly findDomainByIdRepository: FindDomainByIdRepository,
    private readonly updateDomainRepository: UpdateDomainRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateDomainCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const domainId = splitServiceId(data.where?.domainId)?.id;
    if (!domainId) {
      throw new ParamNotFoundException('domainId');
    }

    const domain = await this.findDomainByIdRepository.execute(domainId);
    if (!domain) {
      throw new DomainNotFoundException();
    }

    const updated = await this.updateDomainRepository.execute({
      ...data,
      where: {
        ...data.where,
        domainId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const domainUpdated = await this.findDomainByIdRepository.execute(domainId);
    if (!domainUpdated) {
      throw new DomainNotFoundException();
    }
    const domainModel = this.publisher.mergeObjectContext(domainUpdated);
    domainModel.updatedDomain({
      updatedBy: data.data.updatedBy
    });
    domainModel.commit();

    return domainUpdated;
  }

  private clearData(command: UpdateDomainCommand): UpdateDomainCommand {
    return cleanObject({
      where: cleanObject({
        domainId: cleanValue(command?.where?.domainId)
      }),
      data: cleanObject({
        name: cleanValue(command?.data?.name),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
