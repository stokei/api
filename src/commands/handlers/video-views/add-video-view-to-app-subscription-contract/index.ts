import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { AddVideoViewToAppSubscriptionContractCommand } from '@/commands/implements/video-views/add-video-view-to-app-subscription-contract.command';
import { PlanType } from '@/enums/plan-type.enum';
import {
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  VideoViewNotFoundException
} from '@/errors';
import { SubscriptionContractItemModel } from '@/models/subscription-contract-item.model';
import { AddItemToAppSubscriptionContractService } from '@/services/apps/add-item-to-app-subscription-contract';
import { FindPlanPriceByTypeService } from '@/services/plans/find-plan-price-by-type';
import { FindVideoViewByIdService } from '@/services/video-views/find-video-view-by-id';

type AddVideoViewToAppSubscriptionContractCommandKeys =
  keyof AddVideoViewToAppSubscriptionContractCommand;

@CommandHandler(AddVideoViewToAppSubscriptionContractCommand)
export class AddVideoViewToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddVideoViewToAppSubscriptionContractCommand>
{
  private readonly logger = new Logger(
    AddVideoViewToAppSubscriptionContractCommandHandler.name
  );
  constructor(
    private readonly findVideoViewByIdService: FindVideoViewByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddVideoViewToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.videoView) {
        throw new ParamNotFoundException<AddVideoViewToAppSubscriptionContractCommandKeys>(
          'videoView'
        );
      }

      const videoView = await this.findVideoViewByIdService.execute(
        data.videoView
      );
      if (!videoView) {
        throw new VideoViewNotFoundException();
      }

      const videoViewPrice = await this.findPlanPriceByTypeService.execute(
        PlanType.VIDEO_VIEW
      );
      if (!videoViewPrice) {
        throw new PriceNotFoundException();
      }
      const subscriptionContractItem =
        await this.addItemToAppSubscriptionContractService.execute({
          app: videoView.app,
          price: videoViewPrice.id,
          createdBy: data.createdBy,
          quantity: data.viewedDuration || 1
        });
      return subscriptionContractItem;
    } catch (error) {
      this.logger.error(error?.message);
      return;
    }
  }

  private clearData(
    command: AddVideoViewToAppSubscriptionContractCommand
  ): AddVideoViewToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      videoView: cleanValue(command?.videoView),
      viewedDuration: cleanValueNumber(command?.viewedDuration)
    });
  }
}
