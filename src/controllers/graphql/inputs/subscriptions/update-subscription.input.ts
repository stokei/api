import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataSubscriptionInput {
  @Field(() => Boolean, { nullable: true })
  automaticRenew?: boolean;

  @Field({ nullable: true })
  defaultPaymentMethod?: string;
}

@InputType()
export class UpdateWhereSubscriptionInput {
  @Field()
  subscriptionId: string;
}

@InputType()
export class UpdateSubscriptionInput {
  @Field(() => UpdateDataSubscriptionInput)
  data: UpdateDataSubscriptionInput;

  @Field(() => UpdateWhereSubscriptionInput)
  where: UpdateWhereSubscriptionInput;
}
