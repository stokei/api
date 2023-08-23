import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  cleanObject,
  cleanValue,
  cleanValueNumber,
  convertToISODateString,
  splitServiceId
} from '@stokei/nestjs';

import { ChangeOrderToPaidCommand } from '@/commands/implements/orders/change-order-to-paid.command';
import { ChangeOrderToPaidRepositoryDataDTO } from '@/dtos/orders/change-order-to-paid-repository.dto';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrderModel } from '@/models/order.model';
import { ChangeOrderToPaidRepository } from '@/repositories/orders/change-order-to-paid';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';

type ChangeOrderToPaidCommandKeys = keyof ChangeOrderToPaidCommand;

@CommandHandler(ChangeOrderToPaidCommand)
export class ChangeOrderToPaidCommandHandler
  implements ICommandHandler<ChangeOrderToPaidCommand>
{
  constructor(
    private readonly changeOrderToPaidRepository: ChangeOrderToPaidRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeOrderToPaidCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangeOrderToPaidCommandKeys>('app');
    }
    if (!data?.order) {
      throw new ParamNotFoundException<ChangeOrderToPaidCommandKeys>('order');
    }

    const app = await this.findAppByIdService.execute(data.app);
    if (!app) {
      throw new AppNotFoundException();
    }
    const order = await this.findOrderByIdService.execute(data.order);
    if (!order) {
      throw new OrderNotFoundException();
    }
    const orderPaymentIsCompleted =
      order.totalAmount <= order.paidAmount + data.paidAmount;
    const status = orderPaymentIsCompleted
      ? OrderStatus.PAID
      : OrderStatus.PARTIAL_PAID;
    const dataChangeOrderToPaid: ChangeOrderToPaidRepositoryDataDTO = {
      active: true,
      status,
      paidAmount: data.paidAmount,
      feeAmount: data.feeAmount,
      paidAt: convertToISODateString(Date.now()),
      updatedBy: data.updatedBy
    };
    const orderUpdated = await this.changeOrderToPaidRepository.execute({
      data: dataChangeOrderToPaid,
      where: {
        app: app.id,
        order: splitServiceId(order.id)?.id
      }
    });
    if (!orderUpdated) {
      throw new OrderNotFoundException();
    }
    const orderChanged = new OrderModel({
      ...order,
      ...dataChangeOrderToPaid
    });
    const orderModel = this.publisher.mergeObjectContext(orderChanged);
    orderModel.changedOrderToPaid({
      updatedBy: data.updatedBy
    });
    orderModel.commit();

    return orderChanged;
  }

  private clearData(
    command: ChangeOrderToPaidCommand
  ): ChangeOrderToPaidCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      order: cleanValue(command?.order),
      paidAmount: cleanValueNumber(command?.paidAmount),
      feeAmount: cleanValueNumber(command?.feeAmount),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
