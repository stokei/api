import { Injectable, Scope } from '@nestjs/common';
import { FindAllOrdersAddressesService } from '@/services/orders-addresses/find-all-orders-addresses';
import DataLoader from 'dataloader';

@Injectable({ scope: Scope.REQUEST })
export class OrdersAddressesLoader {
  constructor(
    private readonly ordersAddressesService: FindAllOrdersAddressesService
  ) {}

  readonly findByIds = new DataLoader(async (ordersAddressIds: string[]) => {
    const ordersAddresses = await this.ordersAddressesService.execute({
      where: {
        AND: {
          ids: ordersAddressIds
        }
      }
    });
    const ordersAddressesMap = new Map(
      ordersAddresses?.items?.map((ordersAddress) => [
        ordersAddress.id,
        ordersAddress
      ])
    );
    return ordersAddressIds.map((ordersAddressId) =>
      ordersAddressesMap.get(ordersAddressId)
    );
  });
}
