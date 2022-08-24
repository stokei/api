import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataSubscriptionContractInput {
  @Field(() => Boolean, { nullable: true })
  automaticRenew?: boolean;

  @Field({ nullable: true })
  defaultStripePaymentMethod?: string;
}

@InputType()
export class UpdateWhereSubscriptionContractInput {
  @Field()
  subscriptionContract: string;
}

@InputType()
export class UpdateSubscriptionContractInput {
  @Field(() => UpdateDataSubscriptionContractInput)
  data: UpdateDataSubscriptionContractInput;

  @Field(() => UpdateWhereSubscriptionContractInput)
  where: UpdateWhereSubscriptionContractInput;
}
