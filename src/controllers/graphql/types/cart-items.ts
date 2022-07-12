import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CartItem } from './cart-item';

@ObjectType()
export class CartItems extends Paginated(CartItem) {}
