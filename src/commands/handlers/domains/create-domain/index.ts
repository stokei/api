import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateDomainCommand } from '@/commands/implements/domains/create-domain.command';
import { DomainStatus } from '@/enums/domain-status.enum';
import {
  DataNotFoundException,
  DomainAlreadyExistsException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateDomainRepository } from '@/repositories/domains/create-domain';
import { FindAllDomainsService } from '@/services/domains/find-all-domains';

type CreateDomainCommandKeys = keyof CreateDomainCommand;

@CommandHandler(CreateDomainCommand)
export class CreateDomainCommandHandler
  implements ICommandHandler<CreateDomainCommand>
{
  constructor(
    private readonly createDomainRepository: CreateDomainRepository,
    private readonly findAllDomainsService: FindAllDomainsService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateDomainCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateDomainCommandKeys>('parent');
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateDomainCommandKeys>('name');
    }

    const domains = await this.findAllDomainsService.execute({
      where: {
        AND: {
          name: {
            equals: data.name
          }
        }
      },
      page: {
        limit: 1
      }
    });
    if (domains?.totalCount > 0) {
      throw new DomainAlreadyExistsException();
    }

    const domainCreated = await this.createDomainRepository.execute({
      ...data,
      status: DomainStatus.PENDING
    });
    if (!domainCreated) {
      throw new DomainNotFoundException();
    }
    const domainModel = this.publisher.mergeObjectContext(domainCreated);
    domainModel.createdDomain({
      createdBy: data.createdBy
    });
    domainModel.commit();

    return domainCreated;
  }

  private clearData(command: CreateDomainCommand): CreateDomainCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
