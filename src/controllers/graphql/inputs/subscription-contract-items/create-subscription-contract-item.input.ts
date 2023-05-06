import { Field, Float, InputType } from '@nestjs/graphql';

import { CreateRecurringInput } from '../recurrings/create-recurring.input';

@InputType()
export class CreateSubscriptionContractItemInput {
  @Field(() => Float)
  quantity: number;

  @Field(() => String)
  product: string;

  @Field(() => CreateRecurringInput, { nullable: true })
  recurring?: CreateRecurringInput;
}
