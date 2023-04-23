import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllAddressesDTO,
  WhereDataFindAllAddressesDTO
} from '@/dtos/addresses/find-all-addresses.dto';

@InputType()
class WhereDataFindAllAddressesDataInput
  implements WhereDataFindAllAddressesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  street?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  complement?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  city?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  country?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  state?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  postalCode?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllAddressesInput
  implements OrderByDataFindAllAddressesDTO
{
  @Field(() => OrderBy, { nullable: true })
  street?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  complement?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  city?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  country?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  state?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  postalCode?: OrderBy;

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
export class WhereDataFindAllAddressesInput extends WherePaginated(
  WhereDataFindAllAddressesDataInput
) {}
