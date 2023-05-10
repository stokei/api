import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String)
  price: string;
}
