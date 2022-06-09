import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Cart } from './cart';

@ObjectType()
export class Carts extends Paginated(Cart) {}
