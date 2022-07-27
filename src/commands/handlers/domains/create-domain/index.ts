import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateDomainCommand } from '@/commands/implements/domains/create-domain.command';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateDomainRepository } from '@/repositories/domains/create-domain';

type CreateDomainCommandKeys = keyof CreateDomainCommand;

@CommandHandler(CreateDomainCommand)
export class CreateDomainCommandHandler
  implements ICommandHandler<CreateDomainCommand>
{
  constructor(
    private readonly createDomainRepository: CreateDomainRepository,
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

    const domainCreated = await this.createDomainRepository.execute(data);
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
