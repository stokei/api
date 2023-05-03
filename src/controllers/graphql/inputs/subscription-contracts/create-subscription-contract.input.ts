import { Field, InputType } from '@nestjs/graphql';

import { SubscriptionContractType } from '@/controllers/graphql/enums/subscription-contract-type.enum';

@InputType()
export class CreateSubscriptionContractInput {
  @Field(() => String)
  parent: string;

  @Field(() => String, { nullable: true })
  startAt?: string;

  @Field(() => String, { nullable: true })
  endAt?: string;

  @Field(() => SubscriptionContractType)
  type: SubscriptionContractType;
}
