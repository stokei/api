import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { SendSubscriptionsCustomersSubscriptionCanceledEmailCommand } from '@/commands/implements/emails/subscriptions/customers/send-subscription-canceled-email.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  SubscriptionContractItemsNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindSubscriptionContractItemsDataToEmailService } from '@/services/emails/find-subscription-contract-items-data-to-email';
import { SendEmailService } from '@/services/emails/send-email';

type SendSubscriptionsCustomersSubscriptionCanceledEmailCommandKeys =
  keyof SendSubscriptionsCustomersSubscriptionCanceledEmailCommand;

@CommandHandler(SendSubscriptionsCustomersSubscriptionCanceledEmailCommand)
export class SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler
  implements
    ICommandHandler<SendSubscriptionsCustomersSubscriptionCanceledEmailCommand>
{
  private readonly logger = new Logger(
    SendSubscriptionsCustomersSubscriptionCanceledEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findSubscriptionContractItemsDataToEmailService: FindSubscriptionContractItemsDataToEmailService
  ) {}

  async execute(
    command: SendSubscriptionsCustomersSubscriptionCanceledEmailCommand
  ) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendSubscriptionsCustomersSubscriptionCanceledEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendSubscriptionsCustomersSubscriptionCanceledEmailCommandKeys>(
          'toAccount'
        );
      }
      if (!data.subscriptionContract) {
        throw new SubscriptionContractNotFoundException();
      }

      const toAccount = await this.getToAccount(data.toAccount);
      if (!toAccount) {
        throw new AccountNotFoundException();
      }
      const subscriptionContractItems =
        await this.findSubscriptionContractItemsDataToEmailService.execute({
          subscriptionContract: data.subscriptionContract
        });
      if (!subscriptionContractItems?.length) {
        throw new SubscriptionContractItemsNotFoundException();
      }

      const items = subscriptionContractItems.map((item) => ({
        orderProduct: item.orderProduct,
        productId: item.product.id,
        productName: item.product.name,
        image: item.imageURL
      }));

      return await this.sendEmailService.execute({
        route: '/subscriptions/customers/subscription-canceled',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          subscriptionId: data.subscriptionContract.id,
          items
        }
      });
    } catch (error) {
      this.logger.error(
        `From ${data?.app} to ${data?.toAccount}: ${error?.message}`
      );
      return;
    }
  }

  private clearData(
    command: SendSubscriptionsCustomersSubscriptionCanceledEmailCommand
  ): SendSubscriptionsCustomersSubscriptionCanceledEmailCommand {
    return cleanObject({
      subscriptionContract: command?.subscriptionContract,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
  private async getToAccount(user: string) {
    const id = splitServiceId(user)?.service;
    if (id === ServerStokeiApiIdPrefix.APPS) {
      const app = await this.findAppByIdService.execute(user);
      return {
        name: app.name,
        email: app.email
      };
    }
    const account = await this.findAccountByIdService.execute(user);
    return {
      name: account.fullname,
      email: account.email
    };
  }
}
