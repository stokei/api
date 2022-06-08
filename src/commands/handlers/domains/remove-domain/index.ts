import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveDomainCommand } from '@/commands/implements/domains/remove-domain.command';
import {
  DomainNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindDomainByIdRepository } from '@/repositories/domains/find-domain-by-id';
import { RemoveDomainRepository } from '@/repositories/domains/remove-domain';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

type RemoveDomainCommandKeys = keyof RemoveDomainCommand;

@CommandHandler(RemoveDomainCommand)
export class RemoveDomainCommandHandler
  implements ICommandHandler<RemoveDomainCommand>
{
  constructor(
    private readonly findDomainByIdRepository: FindDomainByIdRepository,
    private readonly removeDomainRepository: RemoveDomainRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveDomainCommand) {
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

    const removed = await this.removeDomainRepository.execute({
      where: {
        domainId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }
    const domainModel = this.publisher.mergeObjectContext(domain);
    domainModel.removedDomain();
    domainModel.commit();

    return domain;
  }

  private clearData(command: RemoveDomainCommand): RemoveDomainCommand {
    return cleanObject({
      where: cleanObject({
        domainId: cleanValue(command?.where?.domainId)
      })
    });
  }
}
