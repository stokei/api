import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { CheckoutsCurrency } from './checkouts-currency';

@ObjectType()
export class CheckoutsCurrencies extends Paginated(CheckoutsCurrency) {}
