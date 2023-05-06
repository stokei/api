import { Field, InputType } from '@nestjs/graphql';

import { SubscriptionContractType } from '@/controllers/graphql/enums/subscription-contract-type.enum';
import { CreateSubscriptionContractItemInput } from '@/controllers/graphql/inputs/subscription-contract-items/create-subscription-contract-item.input';

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

  @Field(() => [CreateSubscriptionContractItemInput], { nullable: true })
  items?: CreateSubscriptionContractItemInput[];
}
