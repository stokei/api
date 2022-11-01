import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveDomainFromAppSubscriptionContractCommand } from '@/commands/implements/domains/remove-domain-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindDomainByIdService } from '@/services/domains/find-domain-by-id';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveDomainFromAppSubscriptionContractCommandKeys =
  keyof RemoveDomainFromAppSubscriptionContractCommand;

@CommandHandler(RemoveDomainFromAppSubscriptionContractCommand)
export class RemoveDomainFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveDomainFromAppSubscriptionContractCommand>
{
  constructor(
    private readonly findDomainByIdService: FindDomainByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveDomainFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.domain) {
      throw new ParamNotFoundException<RemoveDomainFromAppSubscriptionContractCommandKeys>(
        'domain'
      );
    }

    const domain = await this.findDomainByIdService.execute(data.domain);
    if (!domain) {
      throw new DomainNotFoundException();
    }

    const domainPrice = await this.findPlanPriceByTypeService.execute(
      PlanType.DOMAIN
    );
    if (!domainPrice) {
      throw new PriceNotFoundException();
    }

    const subscriptionContractItem =
      await this.removeItemFromAppSubscriptionContractService.execute({
        app: domain.app,
        price: domainPrice.id,
        removedBy: data.removedBy
      });
    return subscriptionContractItem;
  }

  private clearData(
    command: RemoveDomainFromAppSubscriptionContractCommand
  ): RemoveDomainFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      domain: cleanValue(command?.domain)
    });
  }
}
