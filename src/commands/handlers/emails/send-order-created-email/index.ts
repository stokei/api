import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendOrderCreatedEmailCommand } from '@/commands/implements/emails/send-order-created-email.command';
import {
  AppNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  OrderItemsNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  ProductsNotFoundException
} from '@/errors';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { SendEmailService } from '@/services/emails/send-email';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { FindAllProductsService } from '@/services/products/find-all-products';
import { FindProductAvatarService } from '@/services/products/find-product-avatar';
import { convertCurrencyToString } from '@/utils/convertCurrencyToString';

type SendOrderCreatedEmailCommandKeys = keyof SendOrderCreatedEmailCommand;

@CommandHandler(SendOrderCreatedEmailCommand)
export class SendOrderCreatedEmailCommandHandler
  implements ICommandHandler<SendOrderCreatedEmailCommand>
{
  private readonly logger = new Logger(
    SendOrderCreatedEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly findProductAvatarService: FindProductAvatarService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: SendOrderCreatedEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendOrderCreatedEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendOrderCreatedEmailCommandKeys>(
          'toAccount'
        );
      }
      if (!data.order) {
        throw new OrderNotFoundException();
      }

      const toAccount = await this.findAccountByIdService.execute(
        data.toAccount
      );
      if (!toAccount) {
        throw new AppNotFoundException();
      }

      const currency = await this.findCurrencyByIdService.execute(
        data.order.currency
      );
      if (!currency) {
        throw new CurrencyNotFoundException();
      }

      const orderItems = await this.findAllOrderItemsService.execute({
        where: {
          AND: {
            parent: {
              equals: data.order.id
            }
          }
        }
      });
      if (!orderItems?.totalCount) {
        throw new OrderItemsNotFoundException();
      }
      const productIds = orderItems?.items.map(
        (orderItem) => orderItem.product
      );
      const products = await this.findAllProductsService.execute({
        where: {
          AND: {
            ids: productIds
          }
        }
      });
      if (!products?.totalCount) {
        throw new ProductsNotFoundException();
      }

      const items = (
        await Promise.all(
          orderItems?.items.map(async (orderItem) => {
            const product = products.items.find(
              (currentProduct) => currentProduct.id === orderItem.product
            );
            if (!product) {
              return;
            }
            const avatar = await this.findProductAvatarService.execute(product);
            return {
              productId: product.id,
              productName: product.name,
              image: avatar?.file?.url,
              price: convertCurrencyToString({
                amount: orderItem.totalAmount,
                currency: currency.id,
                minorUnit: currency.minorUnit
              }),
              ...(orderItem.subtotalAmount && {
                fromPrice: convertCurrencyToString({
                  amount: orderItem.subtotalAmount,
                  currency: currency.id,
                  minorUnit: currency.minorUnit
                })
              })
            };
          })
        )
      ).filter(Boolean);

      return await this.sendEmailService.execute({
        route: '/emails/order-created',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          subtotalAmount: data.order.subtotalAmount,
          totalAmount: data.order.totalAmount,
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
    command: SendOrderCreatedEmailCommand
  ): SendOrderCreatedEmailCommand {
    return cleanObject({
      order: command?.order,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
