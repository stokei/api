import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { OrdersItem } from './orders-item';

@ObjectType()
export class OrdersItems extends Paginated(OrdersItem) {}
