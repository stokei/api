import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateDomainCommand } from '@/commands/implements/domains/create-domain.command';
import {
  DomainNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateDomainRepository } from '@/repositories/domains/create-domain';
import { cleanObject, cleanValue } from '@stokei/nestjs';

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
    domainModel.createdDomain();
    domainModel.commit();

    return domainCreated;
  }

  private clearData(command: CreateDomainCommand): CreateDomainCommand {
    return cleanObject({
      name: cleanValue(command?.name),
      parent: cleanValue(command?.parent)
    });
  }
}
