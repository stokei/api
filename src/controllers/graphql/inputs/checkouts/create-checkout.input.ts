import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCheckoutInput {
  @Field(() => String, { nullable: true })
  toApp?: string;

  @Field(() => String)
  price: string;
}
