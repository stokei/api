import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { SendSubscriptionsCustomersSubscriptionCanceledEmailCommand } from '@/commands/implements/emails/subscriptions/customers/send-subscription-canceled-email.command';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import {
  AccountNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  ProductsNotFoundException,
  SubscriptionContractItemsNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { FileModel } from '@/models/file.model';
import { ImageModel } from '@/models/image.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { SendEmailService } from '@/services/emails/send-email';
import { FindAllFilesService } from '@/services/files/find-all-files';
import { FindAllImagesService } from '@/services/images/find-all-images';
import { FindAllSubscriptionContractItemsService } from '@/services/subscription-contract-items/find-all-subscription-contract-items';
import { FindSubscriptionContractItemProductService } from '@/services/subscription-contract-items/find-subscription-contract-item-product';

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
    private readonly findAllImagesService: FindAllImagesService,
    private readonly findAllFilesService: FindAllFilesService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findAllSubscriptionContractItemsService: FindAllSubscriptionContractItemsService,
    private readonly findSubscriptionContractItemProductService: FindSubscriptionContractItemProductService,
    private readonly findAccountByIdService: FindAccountByIdService
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
        await this.findAllSubscriptionContractItemsService.execute({
          where: {
            AND: {
              parent: {
                equals: data.subscriptionContract.id
              }
            }
          }
        });
      if (!subscriptionContractItems?.totalCount) {
        throw new SubscriptionContractItemsNotFoundException();
      }
      const productIds = subscriptionContractItems?.items.map(
        (subscriptionContractItem) => subscriptionContractItem.product
      );
      const products = await Promise.all(
        productIds?.map(
          async (productId) =>
            await this.findSubscriptionContractItemProductService.execute(
              productId
            )
        )
      );
      if (!products?.length) {
        throw new ProductsNotFoundException();
      }
      const imageIds = products.map((product) => product?.avatar);
      let images: ImageModel[];
      if (!!imageIds?.length) {
        images = (
          await this.findAllImagesService.execute({
            where: {
              AND: {
                ids: imageIds
              }
            }
          })
        )?.items;
      }
      const fileIds = images?.map((image) => image?.file);
      let files: FileModel[];
      if (!!fileIds?.length) {
        files = (
          await this.findAllFilesService.execute({
            where: {
              AND: {
                ids: fileIds
              }
            }
          })
        )?.items;
      }

      const items = (
        await Promise.all(
          subscriptionContractItems?.items.map(
            async (subscriptionContractItem) => {
              const product = products.find(
                (currentProduct) =>
                  currentProduct.id === subscriptionContractItem.product
              );
              if (!product) {
                return;
              }
              const image = images?.find(
                (currentImage) => currentImage.id === product.avatar
              );
              let avatar: FileModel;
              if (image) {
                avatar = files?.find(
                  (currentFile) => currentFile.id === image?.file
                );
              }
              return {
                productId: product.id,
                productName: product.name,
                image: avatar?.url
              };
            }
          )
        )
      ).filter(Boolean);

      return await this.sendEmailService.execute({
        route: '/subscriptions/customers/subscription-canceled',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
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