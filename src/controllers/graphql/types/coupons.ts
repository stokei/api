import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Coupon } from './coupon';

@ObjectType()
export class Coupons extends Paginated(Coupon) {}
