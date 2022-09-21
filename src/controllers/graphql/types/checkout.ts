import { Field, ObjectType } from '@nestjs/graphql';

import { SubscriptionContract } from './subscription-contract';

@ObjectType()
export class Checkout {
  @Field(() => SubscriptionContract)
  subscriptionContract: SubscriptionContract;

  @Field(() => String)
  clientSecret: string;
}
