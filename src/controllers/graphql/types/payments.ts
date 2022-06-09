import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { Payment } from './payment';

@ObjectType()
export class Payments extends Paginated(Payment) {}
