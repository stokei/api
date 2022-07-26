import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { SubscriptionStatus } from '@/controllers/graphql/enums/subscription-status.enum';
import { SubscriptionType } from '@/controllers/graphql/enums/subscription-type.enum';
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

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  product?: WhereDataStringInput;

  @Field(() => SubscriptionStatus, { nullable: true })
  status?: SubscriptionStatus;

  @Field(() => SubscriptionType, { nullable: true })
  type?: SubscriptionType;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  automaticRenew?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllSubscriptionsInput
  implements OrderByDataFindAllSubscriptionsDTO
{
  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  automaticRenew?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  startAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  endAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  canceledAt?: OrderBy;

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
export class WhereDataFindAllSubscriptionsInput extends WherePaginated(
  WhereDataFindAllSubscriptionsDataInput
) {}
