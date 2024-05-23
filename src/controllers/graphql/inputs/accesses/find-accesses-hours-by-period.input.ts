import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindAccessesHoursByPeriodInput {
  @Field(() => String)
  startAt: string;

  @Field(() => String)
  endAt: string;
}
