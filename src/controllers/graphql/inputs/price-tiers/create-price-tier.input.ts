import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePriceTierInput {
  @Field(() => Int)
  amount: number;

  @Field(() => Int, { nullable: true })
  upTo?: number;

  @Field(() => Boolean)
  infinite: boolean;
}
