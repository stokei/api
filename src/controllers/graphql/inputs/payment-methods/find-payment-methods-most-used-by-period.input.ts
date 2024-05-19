import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPaymentMethodsMostUsedByPeriodInput {
  @Field(() => String)
  startAt: string;

  @Field(() => String)
  endAt: string;
}
