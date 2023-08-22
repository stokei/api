import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateStripeCheckoutCommand } from '@/commands/implements/checkouts/create-stripe-checkout.command';
import { paymentGatewayFees } from '@/constants/payment-gateway-fees';
import { OrderStatus } from '@/enums/order-status.enum';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  OrderAlreadyPaidException,
  OrderItemsNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  PricesNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { getFeeAmount } from '@/utils/get-fee-amount';
import { mountCheckoutCallbackURL } from '@/utils/mount-checkout-callback-url';

type CreateStripeCheckoutCommandKeys = keyof CreateStripeCheckoutCommand;

@CommandHandler(CreateStripeCheckoutCommand)
export class CreateStripeCheckoutCommandHandler
  implements ICommandHandler<CreateStripeCheckoutCommand>
{
  constructor(
    private readonly findAppCurrentDomainService: FindAppCurrentDomainService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly createPaymentService: CreatePaymentService,
    private readonly findAccountByIdService: FindAccountByIdService
  ) {}

  async execute(command: CreateStripeCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateStripeCheckoutCommandKeys>(
        'customer'
      );
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateStripeCheckoutCommandKeys>(
        'createdBy'
      );
    }
    if (!data?.order) {
      throw new ParamNotFoundException<CreateStripeCheckoutCommandKeys>(
        'order'
      );
    }

    const customer = await this.findAccountByIdService.execute(data.customer);
    if (!customer) {
      throw new AccountNotFoundException();
    }

    const customerApp = await this.findAppByIdService.execute(data.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }
    const appDomain = await this.findAppCurrentDomainService.execute(
      customerApp.id
    );

    const order = await this.findOrderByIdService.execute(data.order);
    if (!order) {
      throw new OrderNotFoundException();
    }
    if (order.status === OrderStatus.PAID) {
      throw new OrderAlreadyPaidException();
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

    const cancelUrl = mountCheckoutCallbackURL({
      success: false,
      domain: appDomain.url
    });
    const successUrl = mountCheckoutCallbackURL({
      success: true,
      domain: appDomain.url
    });

    const payment = await this.createPaymentService.execute({
      parent: order.id,
      payer: customer.id,
      currency: order.currency,
      totalAmount: order.totalAmount,
      subtotalAmount: order.subtotalAmount,
      paymentGatewayType: PaymentGatewayType.STRIPE,
      createdBy: data.createdBy,
      app: customerApp.id
    });

    const stripePrices = orderItems?.items
      ?.map((orderItem) => {
        const price = prices?.items?.find(
          (currentPrice) => currentPrice?.id === orderItem.price
        );
        if (!price) {
          return;
        }
        return {
          price: price.stripePrice,
          amount: price.amount,
          quantity: orderItem.quantity
        };
      })
      ?.filter(Boolean);
    const hasRecurringPrice = prices?.items?.some(
      (currentPrice) => !!currentPrice.recurring
    );
    const checkoutSession =
      await this.createStripeCheckoutSessionService.execute({
        mode: hasRecurringPrice ? 'subscription' : 'payment',
        app: customerApp.id,
        currency: customerApp.currency,
        applicationFeePercentage:
          paymentGatewayFees[PaymentGatewayType.STRIPE].percentage,
        applicationFeeAmount: getFeeAmount({
          amount: order.totalAmount,
          paymentGatewayType: PaymentGatewayType.STRIPE
        }),
        order: order.id,
        payment: payment.id,
        cancelUrl,
        successUrl,
        customer: customer.stripeCustomer,
        stripeAccount: customerApp.stripeAccount,
        customerEmail: customer.email,
        customerReference: customer.id,
        prices: stripePrices
      });
    if (!checkoutSession) {
      throw new SubscriptionContractNotFoundException();
    }

    return new CheckoutMapper().toModel({
      payment: payment.id,
      url: checkoutSession.url
    });
  }

  private clearData(
    command: CreateStripeCheckoutCommand
  ): CreateStripeCheckoutCommand {
    return cleanObject({
      paymentMethodType: command?.paymentMethodType,
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      order: cleanValue(command?.order)
    });
  }
}
