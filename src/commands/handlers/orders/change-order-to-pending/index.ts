import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, splitServiceId } from '@stokei/nestjs';

import { ChangeOrderToPendingCommand } from '@/commands/implements/orders/change-order-to-pending.command';
import { ChangeOrderToPendingRepositoryDataDTO } from '@/dtos/orders/change-order-to-pending-repository.dto';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  AppNotFoundException,
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { OrderModel } from '@/models/order.model';
import { ChangeOrderToPendingRepository } from '@/repositories/orders/change-order-to-pending';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';

type ChangeOrderToPendingCommandKeys = keyof ChangeOrderToPendingCommand;

@CommandHandler(ChangeOrderToPendingCommand)
export class ChangeOrderToPendingCommandHandler
  implements ICommandHandler<ChangeOrderToPendingCommand>
{
  constructor(
    private readonly changeOrderToPendingRepository: ChangeOrderToPendingRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: ChangeOrderToPendingCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<ChangeOrderToPendingCommandKeys>('app');
    }
    if (!data?.order) {
      throw new ParamNotFoundException<ChangeOrderToPendingCommandKeys>(
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
    const dataChangeOrderToPending: ChangeOrderToPendingRepositoryDataDTO = {
      active: false,
      status: OrderStatus.PENDING,
      updatedBy: data.updatedBy
    };
    const orderUpdated = await this.changeOrderToPendingRepository.execute({
      data: dataChangeOrderToPending,
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
      ...dataChangeOrderToPending
    });
    const orderModel = this.publisher.mergeObjectContext(orderChanged);
    orderModel.changedOrderToPending({
      updatedBy: data.updatedBy
    });
    orderModel.commit();

    return orderChanged;
  }

  private clearData(
    command: ChangeOrderToPendingCommand
  ): ChangeOrderToPendingCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      order: cleanValue(command?.order),
      updatedBy: cleanValue(command?.updatedBy)
    });
  }
}
