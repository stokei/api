import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddVideoFileToAppSubscriptionContractCommand } from '@/commands/implements/files/add-video-file-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  FileNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindFileByIdService } from '@/services/files/find-file-by-id';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';

type AddVideoFileToAppSubscriptionContractCommandKeys =
  keyof AddVideoFileToAppSubscriptionContractCommand;

@CommandHandler(AddVideoFileToAppSubscriptionContractCommand)
export class AddVideoFileToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddVideoFileToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddVideoFileToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddVideoFileToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.file) {
        throw new ParamNotFoundException<AddVideoFileToAppSubscriptionContractCommandKeys>(
          'file'
        );
      }

      const file = await this.findFileByIdService.execute(data.file);
      if (!file) {
        throw new FileNotFoundException();
      }

      const filePrice = await this.findPlanPriceByTypeService.execute(
        PlanType.VIDEO
      );
      if (!filePrice) {
        throw new PriceNotFoundException();
      }

      const subscriptionContractItem =
        await this.addItemToAppSubscriptionContractService.execute({
          app: file.app,
          price: filePrice.id,
          createdBy: data.createdBy,
          quantity: file.duration || 1
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: AddVideoFileToAppSubscriptionContractCommand
  ): AddVideoFileToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      file: cleanValue(command?.file)
    });
  }
}
