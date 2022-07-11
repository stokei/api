import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { OrderItem } from './order-item';

@ObjectType()
export class OrderItems extends Paginated(OrderItem) {}
