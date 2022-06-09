import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllOrdersAddressesDTO,
  WhereDataFindAllOrdersAddressesDTO
} from '@/dtos/orders-addresses/find-all-orders-addresses.dto';

@InputType()
class WhereDataFindAllOrdersAddressesDataInput
  implements WhereDataFindAllOrdersAddressesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllOrdersAddressesInput
  implements OrderByDataFindAllOrdersAddressesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllOrdersAddressesInput extends WherePaginated(
  WhereDataFindAllOrdersAddressesDataInput
) {}
