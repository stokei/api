import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Order } from './order';

@ObjectType()
export class Orders extends Paginated(Order) {}
