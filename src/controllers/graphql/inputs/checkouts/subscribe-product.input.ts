import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SubscribeProductInput {
  @Field(() => String)
  price: string;
}
