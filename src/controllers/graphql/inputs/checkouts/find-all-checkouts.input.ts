import {
  OrderByDataFindAllCheckoutsDTO,
  WhereDataFindAllCheckoutsDTO
} from '@/dtos/checkouts/find-all-checkouts.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllCheckoutsDataInput
  implements WhereDataFindAllCheckoutsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCheckoutsInput
  implements OrderByDataFindAllCheckoutsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCheckoutsInput extends WherePaginated(
  WhereDataFindAllCheckoutsDataInput
) {}
