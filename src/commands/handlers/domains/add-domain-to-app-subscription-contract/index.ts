import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddDomainToAppSubscriptionContractCommand } from '@/commands/implements/domains/add-domain-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  DomainNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindDomainByIdService } from '@/services/domains/find-domain-by-id';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type AddDomainToAppSubscriptionContractCommandKeys =
  keyof AddDomainToAppSubscriptionContractCommand;

@CommandHandler(AddDomainToAppSubscriptionContractCommand)
export class AddDomainToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddDomainToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddDomainToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findDomainByIdService: FindDomainByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddDomainToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.domain) {
        throw new ParamNotFoundException<AddDomainToAppSubscriptionContractCommandKeys>(
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
        await this.addItemToAppSubscriptionContractService.execute({
          app: domain.app,
          price: domainPrice.id,
          createdBy: data.createdBy,
          quantity: 1
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: AddDomainToAppSubscriptionContractCommand
  ): AddDomainToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      domain: cleanValue(command?.domain)
    });
  }
}
