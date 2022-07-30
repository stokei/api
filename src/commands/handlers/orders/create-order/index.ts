import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrderCommand } from '@/commands/implements/orders/create-order.command';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  CartItemsNotFoundException,
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CreateOrderRepository } from '@/repositories/orders/create-order';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { FindAllCartItemsService } from '@/services/cart-items/find-all-cart-items';
import { FindPlanByIdService } from '@/services/plans/find-plan-by-id';
import { CalculatePricesInformationService } from '@/services/prices/calculate-prices-information';

type CreateOrderCommandKeys = keyof CreateOrderCommand;

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly findPlanByIdService: FindPlanByIdService,
    private readonly findAllCartItemsService: FindAllCartItemsService,
    private readonly calculatePricesInformationService: CalculatePricesInformationService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.app) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('app');
    }
    if (!data?.cart) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('cart');
    }
    if (!data?.customer) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('customer');
    }

    const cartItems = await this.findAllCartItemsService.execute({
      where: {
        AND: {
          app: {
            equals: data.app
          },
          parent: {
            equals: data.cart
          }
        }
      }
    });

    if (!cartItems?.items?.length) {
      throw new CartItemsNotFoundException();
    }

    const app = await this.findAppByIdService.execute(data.app);
    const appPlan = await this.findPlanByIdService.execute(app.plan);

    const priceIds = cartItems.items.map((cartItem) => cartItem.price);

    const { subtotalAmount, totalAmount, discountAmount } =
      await this.calculatePricesInformationService.execute({
        prices: priceIds
      });
    const applicationFeeAmount = this.calculateApplicationFeeAmount(
      appPlan.applicationFeePercentage,
      totalAmount
    );
    const orderCreated = await this.createOrderRepository.execute({
      ...data,
      currency: app.currency,
      status: OrderStatus.PENDING,
      applicationFeePercentage: appPlan.applicationFeePercentage,
      applicationFeeAmount: applicationFeeAmount,
      amount: totalAmount,
      subtotalAmount,
      totalAmount,
      discountAmount
    });
    if (!orderCreated) {
      throw new OrderNotFoundException();
    }
    const orderModel = this.publisher.mergeObjectContext(orderCreated);
    orderModel.createdOrder({
      createdBy: data.createdBy
    });
    orderModel.commit();

    return orderCreated;
  }

  private calculateApplicationFeeAmount(
    applicationFeePercentage: number,
    amount: number
  ) {
    const total = amount * (applicationFeePercentage / 100);
    if (total < 0) {
      return 0;
    }
    return total;
  }

  private clearData(command: CreateOrderCommand): CreateOrderCommand {
    return cleanObject({
      app: cleanValue(command?.app),
      cart: cleanValue(command?.cart),
      customer: cleanValue(command?.customer),
      createdBy: cleanValue(command?.createdBy)
    });
  }
}
