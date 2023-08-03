import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePixCheckoutInput {
  @Field(() => String)
  price: string;
}
