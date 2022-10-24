import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanSlug, cleanValue } from '@stokei/nestjs';
import { nanoid } from 'nanoid';

import { CreateSubscriptionContractItemCommand } from '@/commands/implements/subscription-contract-items/create-subscription-contract-item.command';
import {
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemNotFoundException
} from '@/errors';
import { CreateSubscriptionContractItemRepository } from '@/repositories/subscription-contract-items/create-subscription-contract-item';

type CreateSubscriptionContractItemCommandKeys =
  keyof CreateSubscriptionContractItemCommand;

@CommandHandler(CreateSubscriptionContractItemCommand)
export class CreateSubscriptionContractItemCommandHandler
  implements ICommandHandler<CreateSubscriptionContractItemCommand>
{
  constructor(
    private readonly createSubscriptionContractItemRepository: CreateSubscriptionContractItemRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateSubscriptionContractItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'parent'
      );
    }
    if (!data?.name) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'name'
      );
    }
    if (!data?.file) {
      throw new ParamNotFoundException<CreateSubscriptionContractItemCommandKeys>(
        'file'
      );
    }

    const slug = cleanSlug(data.name + nanoid(8));
    const subscriptionContractItemCreated =
      await this.createSubscriptionContractItemRepository.execute({
        ...data,
        active: false,
        slug
      });
    if (!subscriptionContractItemCreated) {
      throw new SubscriptionContractItemNotFoundException();
    }
    const subscriptionContractItemModel = this.publisher.mergeObjectContext(
      subscriptionContractItemCreated
    );
    subscriptionContractItemModel.createdSubscriptionContractItem({
      createdBy: data.createdBy
    });
    subscriptionContractItemModel.commit();

    return subscriptionContractItemCreated;
  }

  private clearData(
    command: CreateSubscriptionContractItemCommand
  ): CreateSubscriptionContractItemCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      name: cleanValue(command?.name),
      description: cleanValue(command?.description),
      file: cleanValue(command?.file),
      poster: cleanValue(command?.poster),
      parent: cleanValue(command?.parent)
    });
  }
}
