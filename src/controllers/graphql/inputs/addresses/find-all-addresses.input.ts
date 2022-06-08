import {
  OrderByDataFindAllAddressesDTO,
  WhereDataFindAllAddressesDTO
} from '@/dtos/addresses/find-all-addresses.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllAddressesDataInput
  implements WhereDataFindAllAddressesDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllAddressesInput
  implements OrderByDataFindAllAddressesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllAddressesInput extends WherePaginated(
  WhereDataFindAllAddressesDataInput
) {}
