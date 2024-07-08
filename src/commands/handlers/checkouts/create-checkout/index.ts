import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateCheckoutCommand } from '@/commands/implements/checkouts/create-checkout.command';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  AccountNotFoundException,
  AppNotFoundException,
  CouponNotFoundException,
  CurrencyNotFoundException,
  DataNotFoundException,
  OrderAlreadyPaidException,
  OrderItemsNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  PaymentNotFoundException,
  PricesNotFoundException
} from '@/errors';
import { CouponModel } from '@/models/coupon.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindCouponByIdService } from '@/services/coupons/find-coupon-by-id';
import { FindCurrencyByIdService } from '@/services/currencies/find-currency-by-id';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { ChangeOrderToPendingService } from '@/services/orders/change-order-to-pending';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { ChangePaymentToPaymentErrorService } from '@/services/payments/change-payment-to-payment-error';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { CreatePaymentByPaymentProcessorService } from '@/services/payments-gateways/factories/create-payment';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { getFeeAmount } from '@/utils/get-fee-amount';

type CreateCheckoutCommandKeys = keyof CreateCheckoutCommand;

@CommandHandler(CreateCheckoutCommand)
export class CreateCheckoutCommandHandler
  implements ICommandHandler<CreateCheckoutCommand>
{
  constructor(
    private readonly changeOrderToPendingService: ChangeOrderToPendingService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findCouponByIdService: FindCouponByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly findCurrencyByIdService: FindCurrencyByIdService,
    private readonly changePaymentToPaymentErrorService: ChangePaymentToPaymentErrorService,
    private readonly createPaymentByPaymentProcessorService: CreatePaymentByPaymentProcessorService,
    private readonly createPaymentService: CreatePaymentService
  ) {}

  async execute(command: CreateCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('customer');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('createdBy');
    }
    if (!data?.order) {
      throw new ParamNotFoundException<CreateCheckoutCommandKeys>('order');
    }

    const customer = await this.findAccountByIdService.execute(data.customer);
    if (!customer) {
      throw new AccountNotFoundException();
    }
    const customerApp = await this.findAppByIdService.execute(data.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }
    const currency = await this.findCurrencyByIdService.execute(
      customerApp.currency
    );
    if (!currency) {
      throw new CurrencyNotFoundException();
    }

    let order = await this.findOrderByIdService.execute(data.order);
    if (!order) {
      throw new OrderNotFoundException();
    }
    if (order.status === OrderStatus.PAID) {
      throw new OrderAlreadyPaidException();
    }
    if (order.status !== OrderStatus.PENDING) {
      order = await this.changeOrderToPendingService.execute({
        app: data.app,
        order: order.id,
        updatedBy: data.createdBy
      });
    }

    const orderItems = await this.findAllOrderItemsService.execute({
      where: {
        AND: {
          parent: {
            equals: order.id
          }
        }
      }
    });
    if (!orderItems?.totalCount) {
      throw new OrderItemsNotFoundException();
    }
    const pricesIds = orderItems?.items?.map(({ price }) => price);
    const prices = await this.findAllPricesService.execute({
      where: {
        AND: {
          ids: pricesIds
        }
      }
    });
    if (!prices?.totalCount) {
      throw new PricesNotFoundException();
    }
    let coupon: CouponModel;
    try {
      coupon = await this.findCouponByIdService.execute(order.coupon);
      if (!coupon?.active) {
        throw new CouponNotFoundException();
      }
    } catch (error) {}

    const paymentGatewayType = data.paymentGatewayType;
    const payment = await this.createPaymentService.execute({
      parent: order.id,
      payer: customer.id,
      currency: order.currency,
      totalAmount: order.totalAmount,
      subtotalAmount: order.subtotalAmount,
      feeAmount: getFeeAmount({
        amount: order.totalAmount,
        feePercentage: customerApp.feePercentage
      }),
      paymentGatewayType,
      createdBy: data.createdBy,
      app: data.app
    });

    try {
      const paymentGatewayResponse =
        await this.createPaymentByPaymentProcessorService.execute({
          app: customerApp,
          currency,
          payer: customer,
          coupon,
          payment,
          paymentGatewayType,
          installments: 1,
          items: orderItems.items?.map((item) => {
            const price = prices.items.find(
              (priceItem) => priceItem.id === item.price
            );
            return {
              quantity: item.quantity,
              name: price.nickname,
              amount: price.amount
            };
          }),
          successURL: data.successURL,
          cancelURL: data.cancelURL,
          createdBy: data.createdBy
        });
      if (!paymentGatewayResponse) {
        throw new PaymentNotFoundException();
      }

      return paymentGatewayResponse;
    } catch (error) {
      this.changePaymentToPaymentErrorService.execute({
        payment: payment.id,
        updatedBy: data.createdBy
      });
      throw error;
    }
  }

  private clearData(command: CreateCheckoutCommand): CreateCheckoutCommand {
    return cleanObject({
      paymentGatewayType: command?.paymentGatewayType,
      successURL: cleanValue(command?.successURL),
      cancelURL: cleanValue(command?.cancelURL),
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      order: cleanValue(command?.order)
    });
  }
}
