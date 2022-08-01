import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue, cleanValueNumber } from '@stokei/nestjs';

import { CreateOrderItemCommand } from '@/commands/implements/order-items/create-order-item.command';
import {
  DataNotFoundException,
  OrderItemNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  ProductNotFoundException
} from '@/errors';
import { CreateOrderItemRepository } from '@/repositories/order-items/create-order-item';
import { FindOrderByIdService } from '@/services/orders/find-order-by-id';
import { FindPriceByIdService } from '@/services/prices/find-price-by-id';
import { FindProductByIdService } from '@/services/products/find-product-by-id';

type CreateOrderItemCommandKeys = keyof CreateOrderItemCommand;

@CommandHandler(CreateOrderItemCommand)
export class CreateOrderItemCommandHandler
  implements ICommandHandler<CreateOrderItemCommand>
{
  constructor(
    private readonly createOrderItemRepository: CreateOrderItemRepository,
    private readonly findOrderByIdService: FindOrderByIdService,
    private readonly findProductByIdService: FindProductByIdService,
    private readonly findPriceByIdService: FindPriceByIdService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderItemCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.order) {
      throw new ParamNotFoundException<CreateOrderItemCommandKeys>('order');
    }
    if (!data?.product) {
      throw new ParamNotFoundException<CreateOrderItemCommandKeys>('product');
    }
    const order = await this.findOrderByIdService.execute(data.order);
    if (!order) {
      throw new OrderNotFoundException();
    }
    const product = await this.findProductByIdService.execute(data.product);
    if (!product) {
      throw new ProductNotFoundException();
    }
    const price = await this.findPriceByIdService.execute(data.price);
    if (!price) {
      throw new PriceNotFoundException();
    }

    const orderItemCreated = await this.createOrderItemRepository.execute({
      ...data,
      currency: order.currency,
      name: product.name,
      amount: price.amount,
      fromAmount: price.fromAmount,
      recurringIntervalCount: price.recurringIntervalCount,
      recurringIntervalType: price.recurringIntervalType,
      type: price.type
    });
    if (!orderItemCreated) {
      throw new OrderItemNotFoundException();
    }
    const orderItemModel = this.publisher.mergeObjectContext(orderItemCreated);
    orderItemModel.createdOrderItem({
      createdBy: data.createdBy
    });
    orderItemModel.commit();

    return orderItemCreated;
  }

  private clearData(command: CreateOrderItemCommand): CreateOrderItemCommand {
    return cleanObject({
      order: cleanValue(command?.order),
      product: cleanValue(command?.product),
      price: cleanValue(command?.price),
      quantity: cleanValueNumber(command?.quantity),
      app: cleanValue(command?.app),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
