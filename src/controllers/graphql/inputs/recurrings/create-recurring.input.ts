import { Field, InputType, Int } from '@nestjs/graphql';

import { IntervalType } from '@/controllers/graphql/enums/interval-type.enum';
import { UsageType } from '@/controllers/graphql/enums/usage-type.enum';

@InputType()
export class CreateRecurringInput {
  @Field(() => UsageType)
  usageType: UsageType;

  @Field(() => IntervalType)
  interval: IntervalType;

  @Field(() => Int)
  intervalCount: number;
}
