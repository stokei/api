import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateStripeCheckoutCommand } from '@/commands/implements/checkouts/create-stripe-checkout.command';
import { PriceType } from '@/enums/price-type.enum';
import { APPLICATION_FEE_PERCENT } from '@/environments';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  SubscriptionContractAlreadyActiveException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAppCurrentDomainService } from '@/services/apps/find-app-current-domain';
import { CreateOrderItemService } from '@/services/order-items/create-order-item';
import { CreateOrderService } from '@/services/orders/create-order';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { CreateStripeCheckoutSessionService } from '@/services/stripe/create-stripe-checkout-session';
import { UserHasSubscriptionContractActiveService } from '@/services/subscription-contracts/user-has-subscription-contract-active';
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
    private readonly userHasSubscriptionContractActiveService: UserHasSubscriptionContractActiveService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly createStripeCheckoutSessionService: CreateStripeCheckoutSessionService,
    private readonly createOrderService: CreateOrderService,
    private readonly createOrderItemService: CreateOrderItemService,
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
    if (!data?.price) {
      throw new ParamNotFoundException<CreateStripeCheckoutCommandKeys>(
        'price'
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
    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price?.active || price.app !== customerApp.id) {
      throw new PriceNotFoundException();
    }
    const productId = price.parent;

    const hasActivePrice =
      await this.userHasSubscriptionContractActiveService.execute({
        price: price.id,
        product: productId,
        app: customerApp.id,
        customer: customer?.id
      });
    if (hasActivePrice) {
      throw new SubscriptionContractAlreadyActiveException();
    }

    const cancelUrl = mountCheckoutCallbackURL({
      success: false,
      domain: appDomain.url,
      product: productId
    });
    const successUrl = mountCheckoutCallbackURL({
      success: true,
      domain: appDomain.url,
      product: productId
    });

    const applicationFeeAmount = getFeeAmount({
      amount: price.amount,
      feePercentage: APPLICATION_FEE_PERCENT
    });
    const order = await this.createOrderService.execute({
      parent: customer.id,
      currency: price.currency,
      paidAmount: price.amount,
      totalAmount: price.amount,
      subtotalAmount: price.fromAmount || price.amount,
      createdBy: data.createdBy,
      app: customerApp.id
    });
    await this.createOrderItemService.execute({
      parent: order.id,
      product: productId,
      quantity: 1,
      price: price.id,
      recurring: price.recurring,
      subtotalAmount: price.fromAmount || price.amount,
      totalAmount: price.amount,
      createdBy: data.createdBy,
      app: customerApp.id
    });
    const payment = await this.createPaymentService.execute({
      parent: order.id,
      payer: customer.id,
      currency: price.currency,
      totalAmount: price.amount,
      subtotalAmount: price.fromAmount || price.amount,
      createdBy: data.createdBy,
      app: customerApp.id
    });

    const checkoutSession =
      await this.createStripeCheckoutSessionService.execute({
        mode: price?.type === PriceType.RECURRING ? 'subscription' : 'payment',
        app: customerApp.id,
        currency: customerApp.currency,
        applicationFeePercentage: APPLICATION_FEE_PERCENT,
        applicationFeeAmount,
        order: order.id,
        payment: payment.id,
        cancelUrl,
        successUrl,
        customer: customer.stripeCustomer,
        stripeAccount: customerApp.stripeAccount,
        customerEmail: customer.email,
        customerReference: customer.id,
        prices: [
          {
            price: price.stripePrice,
            quantity: 1,
            amount: price.amount
          }
        ]
      });
    if (!checkoutSession) {
      throw new SubscriptionContractNotFoundException();
    }

    return new CheckoutMapper().toModel({
      order: order.id,
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
      price: cleanValue(command?.price)
    });
  }
}
