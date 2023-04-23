import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { SubscriptionContractStatus } from '@/controllers/graphql/enums/subscription-contract-status.enum';
import { SubscriptionContractType } from '@/controllers/graphql/enums/subscription-contract-type.enum';
import {
  OrderByDataFindAllSubscriptionContractsDTO,
  WhereDataFindAllSubscriptionContractsDTO
} from '@/dtos/subscription-contracts/find-all-subscription-contracts.dto';

@InputType()
class WhereDataFindAllSubscriptionContractsDataInput
  implements WhereDataFindAllSubscriptionContractsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  product?: WhereDataStringInput;

  @Field(() => SubscriptionContractStatus, { nullable: true })
  status?: SubscriptionContractStatus;

  @Field(() => SubscriptionContractType, { nullable: true })
  type?: SubscriptionContractType;

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
export class OrderByDataFindAllSubscriptionContractsInput
  implements OrderByDataFindAllSubscriptionContractsDTO
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
export class WhereDataFindAllSubscriptionContractsInput extends WherePaginated(
  WhereDataFindAllSubscriptionContractsDataInput
) {}
