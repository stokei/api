import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput
} from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/controllers/graphql/enums/subscription-contract-status.enum';
import {
  OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO,
  WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO
} from '@/dtos/subscription-contract-items/find-all-subscription-contract-items-by-subscription.dto';

@InputType()
export class WhereDataFindAllSubscriptionContractItemsBySubscriptionInput
  implements WhereDataFindAllSubscriptionContractItemsBySubscriptionDTO
{
  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  product?: WhereDataSearchInput;

  @Field(() => SubscriptionContractStatus, { nullable: true })
  status?: SubscriptionContractStatus;
}

@InputType()
export class OrderByDataFindAllSubscriptionContractItemsBySubscriptionInput
  implements OrderByDataFindAllSubscriptionContractItemsBySubscriptionDTO
{
  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdBy?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedBy?: OrderBy;
}
