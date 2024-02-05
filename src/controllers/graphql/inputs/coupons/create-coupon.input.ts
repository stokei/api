import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCouponInput {
  @Field()
  code: string;

  @Field({ nullable: true })
  recipient?: string;

  @Field(() => Float, { nullable: true })
  amountOff?: number;

  @Field(() => Float, { nullable: true })
  percentOff?: number;
}
