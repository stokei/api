import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { RemoveFileFromAppSubscriptionContractCommand } from '@/commands/implements/files/remove-file-from-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { RemoveItemFromAppSubscriptionContractService } from '@/services/apps/remove-item-from-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';
import { convertBytesToMegabytes } from '@/utils/convert-bytes-to-megabytes';

type RemoveFileFromAppSubscriptionContractCommandKeys =
  keyof RemoveFileFromAppSubscriptionContractCommand;

@CommandHandler(RemoveFileFromAppSubscriptionContractCommand)
export class RemoveFileFromAppSubscriptionContractCommandHandler
  implements ICommandHandler<RemoveFileFromAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    RemoveFileFromAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly removeItemFromAppSubscriptionContractService: RemoveItemFromAppSubscriptionContractService
  ) {}

  async execute(
    command: RemoveFileFromAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);

    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.file) {
        throw new ParamNotFoundException<RemoveFileFromAppSubscriptionContractCommandKeys>(
          'file'
        );
      }

      const filePrice = await this.findPlanPriceByTypeService.execute(
        PlanType.STORAGE
      );
      if (!filePrice) {
        throw new PriceNotFoundException();
      }

      const mbytes = convertBytesToMegabytes(data.file.size);
      const subscriptionContractItem =
        await this.removeItemFromAppSubscriptionContractService.execute({
          quantity: mbytes >= 1 ? mbytes : 1,
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
    command: RemoveFileFromAppSubscriptionContractCommand
  ): RemoveFileFromAppSubscriptionContractCommand {
    return cleanObject({
      removedBy: cleanValue(command?.removedBy),
      file: command?.file
    });
  }
}
