import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubscriptionInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
