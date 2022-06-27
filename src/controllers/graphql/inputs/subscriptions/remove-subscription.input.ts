import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereSubscriptionInput {
  @Field()
  subscriptionId: string;
}

@InputType()
export class RemoveSubscriptionInput {
  @Field(() => RemoveWhereSubscriptionInput)
  where: RemoveWhereSubscriptionInput;
}
