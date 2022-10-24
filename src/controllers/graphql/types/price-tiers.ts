import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { PriceTier } from './price-tier';

@ObjectType()
export class PriceTiers extends Paginated(PriceTier) {}
