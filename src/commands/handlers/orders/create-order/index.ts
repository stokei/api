import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { cleanObject, cleanValue } from '@stokei/nestjs';

import { CreateOrderCommand } from '@/commands/implements/orders/create-order.command';
import { OrderStatus } from '@/enums/order-status.enum';
import {
  AccountNotFoundException,
  AppNotFoundException,
  DataNotFoundException,
  OrderNotFoundException,
  ParamNotFoundException,
  PriceNotFoundException,
  PricesNotFoundException,
  SubscriptionContractAlreadyActiveException
} from '@/errors';
import { PriceModel } from '@/models/price.model';
import { CreateOrderRepository } from '@/repositories/orders/create-order';
import { FindAccountByIdService } from '@/services/accounts/find-account-by-id';
import { FindAppByIdService } from '@/services/apps/find-app-by-id';
import { CreateOrderItemService } from '@/services/order-items/create-order-item';
import { RemoveOrderService } from '@/services/orders/remove-order';
import { FindAllPricesService } from '@/services/prices/find-all-prices';
import { UserHasSubscriptionContractActiveService } from '@/services/subscription-contracts/user-has-subscription-contract-active';

type CreateOrderCommandKeys = keyof CreateOrderCommand;

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly userHasSubscriptionContractActiveService: UserHasSubscriptionContractActiveService,
    private readonly findAppByIdService: FindAppByIdService,
    private readonly removeOrderService: RemoveOrderService,
    private readonly findAllPricesService: FindAllPricesService,
    private readonly createOrderItemService: CreateOrderItemService,
    private readonly findAccountByIdService: FindAccountByIdService,
    private readonly createOrderRepository: CreateOrderRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateOrderCommand) {
    const data = this.clearData(command);
    if (!data) {
      throw new DataNotFoundException();
    }
    if (!data?.parent) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('parent');
    }
    if (!data?.createdBy) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('createdBy');
    }
    if (!data?.items?.length) {
      throw new ParamNotFoundException<CreateOrderCommandKeys>('items');
    }

    const customer = await this.findAccountByIdService.execute(data.parent);
    if (!customer) {
      throw new AccountNotFoundException();
    }

    const customerApp = await this.findAppByIdService.execute(data.app);
    if (!customerApp) {
      throw new AppNotFoundException();
    }

    const pricesIds = data?.items?.map(({ price }) => price);
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
    const isThereAPriceForAnotherApp = prices?.items?.some(
      (price) => price.app !== customerApp.id
    );
    if (isThereAPriceForAnotherApp) {
      throw new PriceNotFoundException();
    }

    const { subtotalAmount, totalAmount } = this.getAmounts({
      prices: prices?.items
    });

    const hasActivePrice = await this.hasActivePrices({
      prices: prices?.items,
      app: customerApp.id,
      customer: customer?.id
    });
    if (hasActivePrice) {
      throw new SubscriptionContractAlreadyActiveException();
    }
    const currency = prices?.items?.[0].currency;

    const orderCreated = await this.createOrderRepository.execute({
      parent: customer.id,
      createdBy: data.createdBy,
      app: customerApp.id,
      currency,
      paidAmount: 0,
      feeAmount: 0,
      totalAmount,
      subtotalAmount,
      status: OrderStatus.PENDING,
      active: true
    });
    if (!orderCreated) {
      throw new OrderNotFoundException();
    }
    try {
      await this.createItems({
        app: customerApp.id,
        order: orderCreated?.id,
        prices: prices?.items,
        createdBy: data.createdBy
      });
    } catch (error) {
      await this.removeOrderService.execute({
        where: {
          order: orderCreated.id,
          app: orderCreated.app,
          removedBy: data.createdBy
        }
      });
      throw error;
    }
    const orderModel = this.publisher.mergeObjectContext(orderCreated);
    orderModel.createdOrder({
      createdBy: data.createdBy
    });
    orderModel.commit();

    return orderCreated;
  }

  private clearData(command: CreateOrderCommand): CreateOrderCommand {
    return cleanObject({
      createdBy: cleanValue(command?.createdBy),
      app: cleanValue(command?.app),
      parent: cleanValue(command?.parent),
      items: command?.items
    });
  }

  private getAmounts({ prices }: { prices: PriceModel[] }) {
    return prices?.reduce(
      (prevPrice, currentPrice) => {
        return {
          ...prevPrice,
          subtotalAmount:
            prevPrice?.subtotalAmount +
            (currentPrice?.fromAmount || currentPrice?.amount),
          totalAmount: prevPrice?.totalAmount + currentPrice?.amount
        };
      },
      { subtotalAmount: 0, totalAmount: 0 }
    );
  }

  private async hasActivePrices({
    prices,
    app,
    customer
  }: {
    prices: PriceModel[];
    app: string;
    customer: string;
  }) {
    const activePrices = await Promise.all(
      prices?.map(
        async (price) =>
          await this.userHasSubscriptionContractActiveService.execute({
            price: price.id,
            product: price.parent,
            app,
            customer
          })
      )
    );
    return activePrices?.some((activePrice) => !!activePrice);
  }

  private async createItems({
    prices,
    app,
    order,
    createdBy
  }: {
    prices: PriceModel[];
    app: string;
    order: string;
    createdBy: string;
  }) {
    return await Promise.all(
      prices?.map(
        async (price) =>
          await this.createOrderItemService.execute({
            parent: order,
            product: price.parent,
            quantity: 1,
            price: price.id,
            recurring: price.recurring,
            subtotalAmount: price.fromAmount || price.amount,
            totalAmount: price.amount,
            createdBy,
            app
          })
      )
    );
  }
}
