import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CartsItem } from './carts-item';

@ObjectType()
export class CartsItems extends Paginated(CartsItem) {}
