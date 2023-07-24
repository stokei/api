import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput
} from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractsByItemDTO,
  WhereDataFindAllSubscriptionContractsByItemDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts-by-item.dto';

@InputType()
export class WhereDataFindAllSubscriptionContractsByItemInput
  implements WhereDataFindAllSubscriptionContractsByItemDTO
{
  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  product?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllSubscriptionContractsByItemInput
  implements OrderByDataFindAllSubscriptionContractsByItemDTO
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
