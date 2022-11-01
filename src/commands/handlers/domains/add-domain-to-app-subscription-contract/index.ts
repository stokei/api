import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddDomainToAppSubscriptionContractCommand } from '@/commands/implements/domains/add-domain-to-app-subscription-contract.command';
import { DomainStatus } from '@/enums/domain-status.enum';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';

type AddDomainToAppSubscriptionContractCommandKeys =
  keyof AddDomainToAppSubscriptionContractCommand;

@CommandHandler(AddDomainToAppSubscriptionContractCommand)
export class AddDomainToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddDomainToAppSubscriptionContractCommand>
{
  constructor(
    private readonly findAppByIdService: FindAppByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: AddDomainToAppSubscriptionContractCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<AddDomainToAppSubscriptionContractCommandKeys>(
        'app'
      );
    }
    if (!data?.domain) {
      throw new ParamNotFoundException<AddDomainToAppSubscriptionContractCommandKeys>(
        'domain'
      );
    }

    /*
      - Find Domain Plan Product
      - Find Domain Plan Price
      - FindOrCreate Subscription
      - FindOrCreate SubscriptionItem
    */

    return true;
  }

  private clearData(
    command: AddDomainToAppSubscriptionContractCommand
  ): AddDomainToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      domain: cleanValue(command?.domain)
    });
  }
}
