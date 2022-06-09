import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { PaymentsMethod } from './payments-method';

@ObjectType()
export class PaymentsMethods extends Paginated(PaymentsMethod) {}
