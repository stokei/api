import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindAccessesFrequencyByPeriodInput {
  @Field(() => String)
  startAt: string;

  @Field(() => String)
  endAt: string;
}
