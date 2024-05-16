import { Field, InputType } from '@nestjs/graphql';

import { OrderStatus } from '@/controllers/graphql/enums/order-status.enum';

@InputType()
export class FindOrdersFrequencyByPeriodInput {
  @Field(() => OrderStatus)
  status: OrderStatus;

  @Field(() => String)
  startAt: string;

  @Field(() => String)
  endAt: string;
}
