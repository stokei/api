import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { AddFileToAppSubscriptionContractCommand } from '@/commands/implements/files/add-file-to-app-subscription-contract.command';
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
import { convertBytesToKilobytes } from '@/utils/convert-bytes-to-kilobytes';

type AddFileToAppSubscriptionContractCommandKeys =
  keyof AddFileToAppSubscriptionContractCommand;

@CommandHandler(AddFileToAppSubscriptionContractCommand)
export class AddFileToAppSubscriptionContractCommandHandler
  implements ICommandHandler<AddFileToAppSubscriptionContractCommand>
{
  constructor(
    private readonly findFileByIdService: FindFileByIdService,
    private readonly findPlanPriceByTypeService: FindPlanPriceByTypeService,
    private readonly addItemToAppSubscriptionContractService: AddItemToAppSubscriptionContractService
  ) {}

  async execute(
    command: AddFileToAppSubscriptionContractCommand
  ): Promise<SubscriptionContractItemModel> {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.file) {
      throw new ParamNotFoundException<AddFileToAppSubscriptionContractCommandKeys>(
        'file'
      );
    }

    const file = await this.findFileByIdService.execute(data.file);
    if (!file) {
      throw new FileNotFoundException();
    }

    const filePrice = await this.findPlanPriceByTypeService.execute(
      PlanType.STORAGE
    );
    if (!filePrice) {
      throw new PriceNotFoundException();
    }

    const subscriptionContractItem =
      await this.addItemToAppSubscriptionContractService.execute({
        app: file.app,
        price: filePrice.id,
        createdBy: data.createdBy,
        quantity: convertBytesToKilobytes(file.size)
      });
    return subscriptionContractItem;
  }

  private clearData(
    command: AddFileToAppSubscriptionContractCommand
  ): AddFileToAppSubscriptionContractCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      file: cleanValue(command?.file)
    });
  }
}
