import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { SendOrdersCustomersOrderCreatedEmailCommand } from '@/commands/implements/emails/orders/customers/send-order-created-email.command';
import {
  AccountNotFoundException,
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
import { convertAmountToCurrencyString } from '@/utils/convert-amount-to-currency-string';

type SendOrdersCustomersOrderCreatedEmailCommandKeys =
  keyof SendOrdersCustomersOrderCreatedEmailCommand;

@CommandHandler(SendOrdersCustomersOrderCreatedEmailCommand)
export class SendOrdersCustomersOrderCreatedEmailCommandHandler
  implements ICommandHandler<SendOrdersCustomersOrderCreatedEmailCommand>
{
  private readonly logger = new Logger(
    SendOrdersCustomersOrderCreatedEmailCommandHandler.name
  );
  constructor(
    private readonly sendEmailService: SendEmailService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllProductsService: FindAllProductsService,
    private readonly findProductAvatarService: FindProductAvatarService
  ) {}

  async execute(command: SendOrdersCustomersOrderCreatedEmailCommand) {
    const data = this.clearData(command);
    try {
      if (!data) {
        throw new DataNotFoundException();
      }
      if (!data?.app) {
        throw new ParamNotFoundException<SendOrdersCustomersOrderCreatedEmailCommandKeys>(
          'app'
        );
      }
      if (!data?.toAccount) {
        throw new ParamNotFoundException<SendOrdersCustomersOrderCreatedEmailCommandKeys>(
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
        throw new AccountNotFoundException();
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
              price: convertAmountToCurrencyString({
                amount: orderItem.totalAmount,
                currency: currency.id,
                minorUnit: currency.minorUnit
              }),
              ...(orderItem.subtotalAmount && {
                fromPrice: convertAmountToCurrencyString({
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
        route: '/orders/customers/order-created',
        to: toAccount.email,
        app: data.app,
        createdBy: data.createdBy,
        data: {
          orderId: data.order.id,
          subtotalAmount: convertAmountToCurrencyString({
            amount: data.order.subtotalAmount,
            currency: currency.id,
            minorUnit: currency.minorUnit
          }),
          totalAmount: convertAmountToCurrencyString({
            amount: data.order.totalAmount,
            currency: currency.id,
            minorUnit: currency.minorUnit
          }),
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
    command: SendOrdersCustomersOrderCreatedEmailCommand
  ): SendOrdersCustomersOrderCreatedEmailCommand {
    return cleanObject({
      order: command?.order,
      toAccount: cleanValue(command?.toAccount),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
