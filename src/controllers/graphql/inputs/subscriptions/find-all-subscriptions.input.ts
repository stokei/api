import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllSubscriptionsDTO,
  WhereDataFindAllSubscriptionsDTO
} from '@/dtos/subscriptions/find-all-subscriptions.dto';

@InputType()
class WhereDataFindAllSubscriptionsDataInput
  implements WhereDataFindAllSubscriptionsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllSubscriptionsInput
  implements OrderByDataFindAllSubscriptionsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllSubscriptionsInput extends WherePaginated(
  WhereDataFindAllSubscriptionsDataInput
) {}