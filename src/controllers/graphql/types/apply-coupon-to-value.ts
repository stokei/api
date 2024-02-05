import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApplyCouponToValue {
  @Field(() => Float)
  totalAmount: number;

  @Field(() => Float)
  subtotalAmount: number;

  @Field(() => Float)
  discountAmount: number;
}
