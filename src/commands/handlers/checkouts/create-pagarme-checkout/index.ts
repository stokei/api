import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
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
  PaymentNotFoundException,
  PricesNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { CreatePagarmeOrderService } from '@/services/pagarme/create-pagarme-order';
import { CreatePaymentMethodPixService } from '@/services/payment-methods/create-payment-method-pix';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { FindAllPricesService } from '@/services/prices/find-all-prices';

type CreatePagarmeCheckoutCommandKeys = keyof CreatePagarmeCheckoutCommand;

@CommandHandler(CreatePagarmeCheckoutCommand)
export class CreatePagarmeCheckoutCommandHandler
  implements ICommandHandler<CreatePagarmeCheckoutCommand>
{
  constructor(
    private readonly createPaymentMethodPixService: CreatePaymentMethodPixService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly createPagarmeOrderService: CreatePagarmeOrderService,
    private readonly findAccountByIdService: FindAccountByIdService,
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
    if (!data?.order) {
      throw new ParamNotFoundException<CreatePagarmeCheckoutCommandKeys>(
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

    const paymentMethod = await this.createPaymentMethodPixService.execute({
      app: data.app,
      createdBy: data.createdBy
    });
    const payment = await this.createPaymentService.execute({
      parent: order.id,
      paymentMethod: paymentMethod.id,
      payer: customer.id,
      currency: order.currency,
      totalAmount: order.totalAmount,
      subtotalAmount: order.subtotalAmount,
      paymentGatewayType: PaymentGatewayType.PAGARME,
      createdBy: data.createdBy,
      app: data.app
    });

    const pagarmePrices = orderItems?.items
      ?.map((orderItem) => {
        const price = prices?.items?.find(
          (currentPrice) => currentPrice?.id === orderItem.price
        );
        if (!price) {
          return;
        }
        return {
          id: orderItem.id,
          amount: price.amount,
          name: price.nickname,
          quantity: orderItem.quantity
        };
      })
      ?.filter(Boolean);
    const pagarmeOrder = await this.createPagarmeOrderService.execute({
      appRecipient: customerApp.pagarmeAccount,
      feeAmount: payment.feeAmount,
      currency: order.currency,
      customer: customer.pagarmeCustomer,
      payment: payment.id,
      prices: pagarmePrices
    });
    // ver porque está dando erro no pagamento com PIX
    console.log({ pagarmeOrder });
    if (!pagarmeOrder?.pix?.qrCodeURL) {
      throw new PaymentNotFoundException();
    }
    return new CheckoutMapper().toModel({
      payment: payment.id,
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
      order: cleanValue(command?.order)
    });
  }
}
