import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Checkout } from './checkout';

@ObjectType()
export class Checkouts extends Paginated(Checkout) {}
