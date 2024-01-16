import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCouponInput {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => Float, { nullable: true })
  amountOff?: number;

  @Field(() => Float, { nullable: true })
  percentOff?: number;
}

@InputType()
export class UpdateWhereCouponInput {
  @Field()
  coupon: string;
}

@InputType()
export class UpdateCouponInput {
  @Field(() => UpdateDataCouponInput)
  data: UpdateDataCouponInput;

  @Field(() => UpdateWhereCouponInput)
  where: UpdateWhereCouponInput;
}
