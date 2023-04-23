import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataFloatInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPriceTiersDTO,
  WhereDataFindAllPriceTiersDTO
} from '@/dtos/price-tiers/find-all-price-tiers.dto';

@InputType()
class WhereDataFindAllPriceTiersDataInput
  implements WhereDataFindAllPriceTiersDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataFloatInput, { nullable: true })
  amount?: WhereDataFloatInput;

  @Field(() => WhereDataFloatInput, { nullable: true })
  upTo?: WhereDataFloatInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  infinite?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPriceTiersInput
  implements OrderByDataFindAllPriceTiersDTO
{
  @Field(() => OrderBy, { nullable: true })
  amount?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  upTo?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  infinite?: OrderBy;

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
export class WhereDataFindAllPriceTiersInput extends WherePaginated(
  WhereDataFindAllPriceTiersDataInput
) {}
