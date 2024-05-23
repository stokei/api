import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindProductsBestSellerByPeriodInput {
  @Field(() => String)
  startAt: string;

  @Field(() => String)
  endAt: string;
}
