import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { PaymentMethod } from './payment-method';

@ObjectType()
export class PaymentMethods extends Paginated(PaymentMethod) {}
