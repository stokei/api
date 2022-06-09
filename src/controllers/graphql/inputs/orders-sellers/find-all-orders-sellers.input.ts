import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllOrdersSellersDTO,
  WhereDataFindAllOrdersSellersDTO
} from '@/dtos/orders-sellers/find-all-orders-sellers.dto';

@InputType()
class WhereDataFindAllOrdersSellersDataInput
  implements WhereDataFindAllOrdersSellersDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllOrdersSellersInput
  implements OrderByDataFindAllOrdersSellersDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllOrdersSellersInput extends WherePaginated(
  WhereDataFindAllOrdersSellersDataInput
) {}
