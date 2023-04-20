import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeactivatePriceInput {
  @Field(() => String)
  price: string;
}
