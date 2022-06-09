import { convertToISODateString } from '@stokei/nestjs';

import { OrdersAddressEntity } from '@/entities';
import { OrdersAddressModel } from '@/models/orders-address.model';

export class OrdersAddressMapper {
  toModel(ordersAddress: OrdersAddressEntity) {
    return (
      ordersAddress &&
      new OrdersAddressModel({
        ...ordersAddress,
        updatedAt: convertToISODateString(ordersAddress.updatedAt),
        createdAt: convertToISODateString(ordersAddress.createdAt)
      })
    );
  }
  toModels(ordersAddresses: OrdersAddressEntity[]) {
    return ordersAddresses?.length > 0
      ? ordersAddresses.map(this.toModel).filter(Boolean)
      : [];
  }
}
