import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangeOrderToPaymentErrorCommand } from '@/commands/implements/orders/change-order-to-payment-error.command';
import { ChangeOrderToPaymentErrorRepositoryDataDTO } from '@/dtos/orders/change-order-to-payment-error-repository.dto';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  SubscriptionContractNotFoundException
} from '@/errors';
import { OrderModel } from '@/models/order.model';
import { ChangeOrderToPaymentErrorRepository } from '@/repositories/orders/change-order-to-payment-error';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { FindSubscriptionContractByIdService } from '@/services/subscription-contracts/find-subscription-contract-by-id';

type ChangeOrderToPaymentErrorCommandKeys =
  keyof ChangeOrderToPaymentErrorCommand;

@CommandHandler(ChangeOrderToPaymentErrorCommand)
export class ChangeOrderToPaymentErrorCommandHandler
  implements ICommandHandler<ChangeOrderToPaymentErrorCommand>
{
  constructor(
    private readonly changeOrderToPaymentErrorRepository: ChangeOrderToPaymentErrorRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findSubscriptionContractByIdService: FindSubscriptionContractByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeOrderToPaymentErrorCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangeOrderToPaymentErrorCommandKeys>(
        'app'
      );
    }
    if (!data?.order) {
      throw new ParamNotFoundException<ChangeOrderToPaymentErrorCommandKeys>(
        'order'
      );
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const order = await this.findOrderByIdService.execute(data.order);
    if (!order) {
      throw new OrderNotFoundException();
    }
    const subscriptionContract =
      await this.findSubscriptionContractByIdService.execute(
        order.subscription
      );
    if (!subscriptionContract) {
      throw new SubscriptionContractNotFoundException();
    }

    const dataChangeOrderToPaymentError: ChangeOrderToPaymentErrorRepositoryDataDTO =
      {
        active: true,
        url: data.orderUrl,
        status: OrderStatus.PAID,
        paymentMethod: data.paymentMethod,
        paymentErrorAt: convertToISODateString(Date.now()),
        updatedBy: data.updatedBy
      };
    const orderUpdated = await this.changeOrderToPaymentErrorRepository.execute(
      {
        data: dataChangeOrderToPaymentError,
        where: {
          app: app.id,
          order: splitServiceId(order.id)?.id
        }
      }
    );
    if (!orderUpdated) {
      throw new OrderNotFoundException();
    }
    const orderChanged = new OrderModel({
      ...order,
      ...dataChangeOrderToPaymentError
    });
    const orderModel = this.publisher.mergeObjectContext(orderChanged);
    orderModel.changedOrderToPaymentError();
    orderModel.commit();

    return orderChanged;
  }

  private clearData(
    command: ChangeOrderToPaymentErrorCommand
  ): ChangeOrderToPaymentErrorCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      order: cleanValue(command?.order),
      orderUrl: cleanValue(command?.orderUrl),
      paymentMethod: cleanValue(command?.paymentMethod),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
