import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveDomainFromAppSubscriptionContractCommand } from '@/commands/implements/domains/remove-domain-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveDomainFromAppSubscriptionContractCommandKeys =
  keyof RemoveDomainFromAppSubscriptionContractCommand;

@CommandHandler(RemoveDomainFromAppSubscriptionContractCommand)
export class RemoveDomainFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveDomainFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveDomainFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveDomainFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.domain) {
        throw new ParamNotFoundException<RemoveDomainFromAppSubscriptionContractCommandKeys>(
          'domain'
        );
      }

      const domainPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.DOMAIN
      );
      if (!domainPrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: 1,
          app: data.domain.app,
          price: domainPrice.id,
          removedBy: data.removedBy
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveDomainFromAppSubscriptionContractCommand
  ): RemoveDomainFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      domain: command?.domain
    });
  }
}
