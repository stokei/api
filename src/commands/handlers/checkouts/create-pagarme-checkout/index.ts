import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException,
  SubscriptionContractAlreadyActiveException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateOrderItemService } from '@/services/order-items/create-order-item';
import { CreateOrderService } from '@/services/orders/create-order';
import { CreatePagarmeOrderService } from '@/services/pagarme/create-pagarme-order';
import { CreatePaymentMethodPixService } from '@/services/payment-methods/create-payment-method-pix';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';
import { UserHasSubscriptionContractActiveService } from '@/services/subscription-contracts/user-has-subscription-contract-active';

type CreatePagarmeCheckoutCommandKeys = keyof CreatePagarmeCheckoutCommand;

@CommandHandler(CreatePagarmeCheckoutCommand)
export class CreatePagarmeCheckoutCommandHandler
  implements ICommandHandler<CreatePagarmeCheckoutCommand>
{
  constructor(
    private readonly userHasSubscriptionContractActiveService: UserHasSubscriptionContractActiveService,
    private readonly createPaymentMethodPixService: CreatePaymentMethodPixService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly createPagarmeOrderService: CreatePagarmeOrderService,
    private readonly createOrderItemService: CreateOrderItemService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly createOrderService: CreateOrderService,
    private readonly createPaymentService: CreatePaymentService
  ) {}

  async execute(command: CreatePagarmeCheckoutCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
        'customer'
      );
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
        'createdBy'
      );
    }
    if (!data?.price) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
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

    const price = await this.findPriceByIdService.execute(data?.price);
    if (!price?.active || price.app !== customerApp.id) {
      throw new PriceNotFoundException();
    }
    const product = await this.findProductByIdService.execute(price.parent);
    if (!product) {
      throw new ProductNotFoundException();
    }

    const hasActivePrice =
      await this.userHasSubscriptionContractActiveService.execute({
        price: price.id,
        product: product.id,
        app: customerApp.id,
        customer: customer?.id
      });
    if (hasActivePrice) {
      throw new SubscriptionContractAlreadyActiveException();
    }

    const paymentMethod = await this.createPaymentMethodPixService.execute({
      app: customerApp.id,
      createdBy: data.createdBy
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
      product: product.id,
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
      paymentMethod: paymentMethod.id,
      payer: customer.id,
      currency: price.currency,
      totalAmount: price.amount,
      subtotalAmount: price.fromAmount || price.amount,
      createdBy: data.createdBy,
      app: customerApp.id
    });

    const pagarmeOrder = await this.createPagarmeOrderService.execute({
      appRecipient: customerApp.pagarmeAccount,
      currency: price.currency,
      customer: customer.pagarmeCustomer,
      payment: payment.id,
      prices: [
        {
          id: price.id,
          amount: price.amount,
          name: price.nickname || product.name,
          quantity: 1
        }
      ]
    });

    if (!pagarmeOrder?.pix?.qrCodeURL) {
      throw new SubscriptionContractNotFoundException();
    }
    return new CheckoutMapper().toModel({
      order: order.id,
      pix: {
        copyAndPaste: pagarmeOrder?.pix?.copyAndPaste,
        qrCodeURL: pagarmeOrder?.pix?.qrCodeURL
      }
    });
  }

  private clearData(
    command: CreatePagarmeCheckoutCommand
  ): CreatePagarmeCheckoutCommand {
    return cleanObject({
      paymentMethodType: command?.paymentMethodType,
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      price: cleanValue(command?.price)
    });
  }
}
