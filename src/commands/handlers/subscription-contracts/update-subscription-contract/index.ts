import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueBoolean,
  splitServiceId
} from '@stokei/nestjs';

import { UpdateSubscriptionContractCommand } from '@/commands/implements/subscription-contracts/update-subscription-contract.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FindSubscriptionContractByIdRepository } from '@/repositories/subscription-contracts/find-subscription-contract-by-id';
import { UpdateSubscriptionContractRepository } from '@/repositories/subscription-contracts/update-subscription-contract';

@CommandHandler(UpdateSubscriptionContractCommand)
export class UpdateSubscriptionContractCommandHandler
  implements ICommandHandler<UpdateSubscriptionContractCommand>
{
  constructor(
    private readonly findSubscriptionContractByIdRepository: FindSubscriptionContractByIdRepository,
    private readonly updateSubscriptionContractRepository: UpdateSubscriptionContractRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: UpdateSubscriptionContractCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    const subscriptionContractId = splitServiceId(
      data.where?.subscriptionContract
    )?.id;
    if (!subscriptionContractId) {
      throw new ParamNotFoundException('subscriptionContractId');
    }

    const subscriptionContract =
      await this.findSubscriptionContractByIdRepository.execute(
        subscriptionContractId
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const updated = await this.updateSubscriptionContractRepository.execute({
      ...data,
      where: {
        ...data.where,
        subscriptionContract: subscriptionContractId
      }
    });
    if (!updated) {
      throw new DataNotFoundException();
    }

    const subscriptionContractUpdated =
      await this.findSubscriptionContractByIdRepository.execute(
        subscriptionContractId
      );
    if (!subscriptionContractUpdated) {
      throw new SubscriptionContractNotFoundException();
    }
    const subscriptionContractModel = this.publisher.mergeObjectContext(
      subscriptionContractUpdated
    );
    subscriptionContractModel.updatedSubscriptionContract({
      updatedBy: data.data.updatedBy
    });
    subscriptionContractModel.commit();

    return subscriptionContractUpdated;
  }

  private clearData(
    command: UpdateSubscriptionContractCommand
  ): UpdateSubscriptionContractCommand {
    return cleanObject({
      where: cleanObject({
        app: cleanValue(command?.where?.app),
        subscriptionContract: cleanValue(command?.where?.subscriptionContract)
      }),
      data: cleanObject({
        automaticRenew: cleanValueBoolean(command?.data?.automaticRenew),
        updatedBy: cleanValue(command?.data?.updatedBy)
      })
    });
  }
}
