import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivatePriceInput {
  @Field(() => String)
  price: string;
}
