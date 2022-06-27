import { registerEnumType } from '@nestjs/graphql';

import { OrderStatus } from '@/enums/order-status.enum';

registerEnumType(OrderStatus, {
  name: 'OrderStatus'
});

export { OrderStatus };
