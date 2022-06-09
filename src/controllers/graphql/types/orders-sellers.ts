import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { OrdersSeller } from './orders-seller';

@ObjectType()
export class OrdersSellers extends Paginated(OrdersSeller) {}
