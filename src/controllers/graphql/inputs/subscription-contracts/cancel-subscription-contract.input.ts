import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CancelSubscriptionContractInput {
  @Field(() => String)
  subscriptionContract: string;
}
