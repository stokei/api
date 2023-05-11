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

    const isFirst = await this.isFirstDomain(data.app);
    const domainExists = await this.domainAlreadyExists(data.name);
    if (!!domainExists) {
      throw new DomainAlreadyExistsException();
    }

    const { default: isDefault, ...dataCreate } = data;
    const domainCreated = await this.createDomainRepository.execute({
      ...dataCreate,
      status: DomainStatus.PENDING
    });
    if (!domainCreated) {
      throw new DomainNotFoundException();
    }
    const domainModel = this.publisher.mergeObjectContext(domainCreated);
    domainModel.createdDomain({
      isDefault: isFirst || isDefault,
      createdBy: data.createdBy
    });
    domainModel.commit();

    return domainCreated;
  }

  private async domainAlreadyExists(domainName: string): Promise<boolean> {
    const domains = await this.findAllDomainsService.execute({
      where: {
        AND: {
          name: {
            equals: domainName
          }
        }
      },
      page: {
        limit: 1
      }
    });

    return domains?.totalCount > 0;
  }

  private async isFirstDomain(app: string): Promise<boolean> {
    const domains = await this.findAllDomainsService.execute({
      where: {
        AND: {
          parent: {
            equals: app
          }
        }
      },
      page: {
        limit: 1
      }
    });

    return domains?.totalCount === 0;
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
