import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { RemoveDomainCommand } from '@/commands/implements/domains/remove-domain.command';
import { IS_PRODUCTION } from '@/environments';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindDomainByIdRepository } from '@/repositories/domains/find-domain-by-id';
import { RemoveDomainRepository } from '@/repositories/domains/remove-domain';
import { DeleteVercelDomainService } from '@/services/vercel/delete-vercel-domain';

@CommandHandler(RemoveDomainCommand)
export class RemoveDomainCommandHandler
  implements ICommandHandler<RemoveDomainCommand>
{
  constructor(
    private readonly findDomainByIdRepository: FindDomainByIdRepository,
    private readonly removeDomainRepository: RemoveDomainRepository,
    private readonly deleteVercelDomainService: DeleteVercelDomainService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: RemoveDomainCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data.where?.removedBy) {
      throw new ParamNotFoundException('removedBy');
    }
    const domainId = splitServiceId(data.where?.domain)?.id;
    if (!domainId) {
      throw new ParamNotFoundException('domainId');
    }

    const domain = await this.findDomainByIdRepository.execute(domainId);
    if (!domain) {
      throw new DomainNotFoundException();
    }

    const removed = await this.removeDomainRepository.execute({
      where: {
        ...data.where,
        domain: domainId
      }
    });
    if (!removed) {
      throw new DataNotFoundException();
    }

    if (IS_PRODUCTION) {
      const vercelDomain = await this.deleteVercelDomainService.execute({
        name: domain.name
      });
      if (!vercelDomain) {
        throw new DomainNotFoundException();
      }
    }
    const domainModel = this.publisher.mergeObjectContext(domain);
    domainModel.removedDomain({
      removedBy: data.where.removedBy
    });
    domainModel.commit();

    return domain;
  }

  private clearData(command: RemoveDomainCommand): RemoveDomainCommand {
    return cleanObject({
      where: cleanObject({
        removedBy: cleanValue(command?.where?.removedBy),
        app: cleanValue(command?.where?.app),
        domain: cleanValue(command?.where?.domain)
      })
    });
  }
}
