import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@stokei/nestjs';

import { SubscriptionContract } from './subscription-contract';

@ObjectType()
export class SubscriptionContracts extends Paginated(SubscriptionContract) {}
