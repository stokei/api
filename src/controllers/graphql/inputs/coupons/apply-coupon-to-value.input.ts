import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class ApplyCouponToValueInput {
  @Field(() => String)
  coupon: string;

  @Field(() => Float)
  value: number;
}
