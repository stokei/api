import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveVideoFromAppSubscriptionContractCommand } from '@/commands/implements/files/remove-video-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type RemoveVideoFromAppSubscriptionContractCommandKeys =
  keyof RemoveVideoFromAppSubscriptionContractCommand;

@CommandHandler(RemoveVideoFromAppSubscriptionContractCommand)
export class RemoveVideoFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveVideoFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveVideoFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveVideoFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);

    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.file) {
        throw new ParamNotFoundException<RemoveVideoFromAppSubscriptionContractCommandKeys>(
          'file'
        );
      }

      const filePrice = await this.findPlanPriceByTypeService.execute(
        PlanType.VIDEO
      );
      if (!filePrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: data.file.duration || 1,
          app: data.file.app,
          price: filePrice.id,
          removedBy: data.removedBy
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: RemoveVideoFromAppSubscriptionContractCommand
  ): RemoveVideoFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      file: command?.file
    });
  }
}
