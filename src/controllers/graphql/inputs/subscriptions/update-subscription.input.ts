import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataSubscriptionInput {
  @Field()
  name: string;
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
