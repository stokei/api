import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreatePagarmeCheckoutCommand } from '@/commands/implements/checkouts/create-pagarme-checkout.command';
import { OrderStatus } from '@/enums/order-status.enum';
import { PaymentGatewayType } from '@/enums/payment-gateway-type.enum';
import { PaymentMethodType } from '@/enums/payment-method-type.enum';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  OrderAlreadyPaidException,
  OrderItemsNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  PaymentMethodNotFoundException,
  PaymentNotFoundException,
  PricesNotFoundException
} from '@/errors';
import { CheckoutMapper } from '@/mappers/checkouts';
import { PaymentMethodModel } from '@/models/payment-method.model';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllOrderItemsService } from '@/services/order-items/find-all-order-items';
import { ChangeOrderToPendingService } from '@/services/orders/change-order-to-pending';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { CreatePagarmeOrderService } from '@/services/pagarme/create-pagarme-order';
import { CreatePaymentMethodBoletoService } from '@/services/payment-methods/create-payment-method-boleto';
import { CreatePaymentMethodPixService } from '@/services/payment-methods/create-payment-method-pix';
import { FindPaymentMethodByIdService } from '@/services/payment-methods/find-payment-method-by-id';
import { CreatePaymentService } from '@/services/payments/create-payment';
import { UpdatePaymentService } from '@/services/payments/update-payment';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { getStokeiFeeAmount } from '@/utils/get-fee-amount';

type CreatePagarmeCheckoutCommandKeys = keyof CreatePagarmeCheckoutCommand;

@CommandHandler(CreatePagarmeCheckoutCommand)
export class CreatePagarmeCheckoutCommandHandler
  implements ICommandHandler<CreatePagarmeCheckoutCommand>
{
  constructor(
    private readonly createPaymentMethodPixService: CreatePaymentMethodPixService,
    private readonly createPaymentMethodBoletoService: CreatePaymentMethodBoletoService,
    private readonly findPaymentMethodByIdService: FindPaymentMethodByIdService,
    private readonly changeOrderToPendingService: ChangeOrderToPendingService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findAllOrderItemsService: FindAllOrderItemsService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly createPagarmeOrderService: CreatePagarmeOrderService,
    private readonly updatePaymentService: UpdatePaymentService,
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
    if (!customerApp?.pagarmeAccount) {
      throw new AppNotFoundException();
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

    const paymentGatewayType = PaymentGatewayType.PAGARME;
    const payment = await this.createPaymentService.execute({
      parent: order.id,
      payer: customer.id,
      currency: order.currency,
      totalAmount: order.totalAmount,
      subtotalAmount: order.subtotalAmount,
      paymentMethodType: data.paymentMethodType,
      paymentGatewayType,
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
    const feeAmount = getStokeiFeeAmount({
      amount: order.totalAmount,
      paymentMethodType: data.paymentMethodType,
      paymentGatewayType
    });
    let paymentMethod: PaymentMethodModel;
    if (
      data.paymentMethodType === PaymentMethodType.CARD &&
      !data.paymentMethod
    ) {
      throw new PaymentMethodNotFoundException();
    }

    try {
      if (data.paymentMethodType === PaymentMethodType.CARD) {
        paymentMethod = await this.findPaymentMethodByIdService.execute(
          data.paymentMethod
        );
        if (!paymentMethod) {
          throw new PaymentMethodNotFoundException();
        }
      }
    } catch (error) {}

    const pagarmeOrder = await this.createPagarmeOrderService.execute({
      paymentMethodType: data.paymentMethodType,
      installments: 1,
      app: customerApp,
      appRecipient: customerApp.pagarmeAccount,
      totalAmount: payment.totalAmount,
      feeAmount,
      card: paymentMethod?.referenceId,
      currency: order.currency,
      customer: customer.pagarmeCustomer,
      payment: payment.id,
      prices: pagarmePrices
    });
    if (!pagarmeOrder) {
      throw new PaymentNotFoundException();
    }
    try {
      const paymentMethod = await this.findOrCreatePaymentMethod({
        app: data.app,
        createdBy: data.createdBy,
        paymentMethodId: data.paymentMethod,
        paymentMethodType: data.paymentMethodType
      });
      await this.updatePaymentService.execute({
        where: {
          payment: payment.id,
          app: data.app
        },
        data: {
          paymentMethod: paymentMethod?.id,
          updatedBy: data.createdBy
        }
      });
    } catch (error) {}

    return new CheckoutMapper().toModel({
      payment: payment.id,
      ...(pagarmeOrder?.boleto && {
        boleto: pagarmeOrder?.boleto
      }),
      ...(pagarmeOrder?.card && {
        card: pagarmeOrder?.card
      }),
      ...(pagarmeOrder?.pix && {
        pix: pagarmeOrder?.pix
      })
    });
  }

  private clearData(
    command: CreatePagarmeCheckoutCommand
  ): CreatePagarmeCheckoutCommand {
    return cleanObject({
      paymentMethod: cleanValue(command?.paymentMethod),
      paymentMethodType: command?.paymentMethodType,
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      customer: cleanValue(command?.customer),
      order: cleanValue(command?.order)
    });
  }

  private async findOrCreatePaymentMethod(data: {
    paymentMethodId?: string;
    paymentMethodType: PaymentMethodType;
    app: string;
    createdBy: string;
  }) {
    const createPaymentMethodHandlers: Record<
      PaymentMethodType,
      () => Promise<PaymentMethodModel>
    > = {
      [PaymentMethodType.BOLETO]: async () =>
        await this.createPaymentMethodBoletoService.execute({
          app: data.app,
          createdBy: data.createdBy
        }),
      [PaymentMethodType.CARD]: async () => {
        if (!data?.paymentMethodId) {
          return;
        }
        return await this.findPaymentMethodByIdService.execute(
          data?.paymentMethodId
        );
      },
      [PaymentMethodType.PIX]: async () =>
        await this.createPaymentMethodPixService.execute({
          app: data.app,
          createdBy: data.createdBy
        })
    };
    const createPaymentMethod =
      createPaymentMethodHandlers[data.paymentMethodType];
    const paymentMethod = await createPaymentMethod?.();
    return paymentMethod;
  }
}
