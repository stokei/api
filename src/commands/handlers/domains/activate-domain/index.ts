import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ActivateDomainCommand } from '@/commands/implements/domains/activate-domain.command';
import { ActivateDomainRepositoryDTO } from '@/dtos/domains/activate-domain-repository.dto';
import { DomainStatus } from '@/enums/domain-status.enum';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { ActivateDomainRepository } from '@/repositories/domains/activate-domain';
import { FindDomainByIdService } from '@/services/domains/find-domain-by-id';

type ActivateDomainCommandKeys = keyof ActivateDomainCommand;

@CommandHandler(ActivateDomainCommand)
export class ActivateDomainCommandHandler
  implements ICommandHandler<ActivateDomainCommand>
{
  private readonly logger = new Logger(ActivateDomainCommandHandler.name);
  constructor(
    private readonly findDomainByIdService: FindDomainByIdService,
    private readonly activateDomainRepository: ActivateDomainRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ActivateDomainCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.domain) {
        throw new ParamNotFoundException<ActivateDomainCommandKeys>('domain');
      }
      const domain = await this.findDomainByIdService.execute(data.domain);
      if (!domain) {
        throw new DomainNotFoundException();
      }
      const dataActive: ActivateDomainRepositoryDTO = {
        ...data,
        domain: splitServiceId(domain.id)?.id,
        status: DomainStatus.ACTIVE,
        active: true,
        activatedAt: convertToISODateString(Date.now())
      };

      const domainActivated =
        await this.activateDomainRepository.execute(dataActive);
      if (!domainActivated) {
        throw new DomainNotFoundException();
      }
      const domainModel = this.publisher.mergeObjectContext(domainActivated);
      domainModel.activatedDomain({
        updatedBy: data.updatedBy
      });
      domainModel.commit();

      return domainActivated;
    } catch (error) {
      this.logger.error(`Domain(#${data?.domain}): ${error?.message}`);
      return;
    }
  }

  private clearData(command: ActivateDomainCommand): ActivateDomainCommand {
    return cleanObject({
      updatedBy: cleanValue(command?.updatedBy),
      app: cleanValue(command?.app),
      domain: cleanValue(command?.domain)
    });
  }
}
