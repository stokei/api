import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';
import { OrdersAddress } from './orders-address';

@ObjectType()
export class OrdersAddresses extends Paginated(OrdersAddress) {}
