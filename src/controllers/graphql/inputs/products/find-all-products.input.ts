import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllProductsDTO,
  WhereDataFindAllProductsDTO
} from '@/dtos/products/find-all-products.dto';

@InputType()
class WhereDataFindAllProductsDataInput implements WhereDataFindAllProductsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  description?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  checkoutVisible?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllProductsInput
  implements OrderByDataFindAllProductsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  description?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  app?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  externalProduct?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  checkoutVisible?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  avatar?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  activatedAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  deactivatedAt?: OrderBy;

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
export class WhereDataFindAllProductsInput extends WherePaginated(
  WhereDataFindAllProductsDataInput
) {}
