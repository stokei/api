import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { SubscriptionContractItem } from './subscription-contract-item';

@ObjectType()
export class SubscriptionContractItems extends Paginated(
  SubscriptionContractItem
) {}
