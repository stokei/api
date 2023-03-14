import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionContractItemsDTO,
  WhereDataFindAllSubscriptionContractItemsDTO
} from '@/dtos/subscription-contract-items/find-all-subscription-contract-items.dto';

@InputType()
class WhereDataFindAllSubscriptionContractItemsDataInput
  implements WhereDataFindAllSubscriptionContractItemsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  product?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  price?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllSubscriptionContractItemsInput
  implements OrderByDataFindAllSubscriptionContractItemsDTO
{
  @Field(() => OrderBy, { nullable: true })
  quantity?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdBy?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedBy?: OrderBy;
}

@InputType()
export class WhereDataFindAllSubscriptionContractItemsInput extends WherePaginated(
  WhereDataFindAllSubscriptionContractItemsDataInput
) {}
