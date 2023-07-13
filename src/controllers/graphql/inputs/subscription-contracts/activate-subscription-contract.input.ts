import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivateSubscriptionContractInput {
  @Field(() => String)
  subscriptionContract: string;
}
