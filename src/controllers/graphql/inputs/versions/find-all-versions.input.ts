import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVersionsDTO,
  WhereDataFindAllVersionsDTO
} from '@/dtos/versions/find-all-versions.dto';

@InputType()
class WhereDataFindAllVersionsDataInput implements WhereDataFindAllVersionsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVersionsInput
  implements OrderByDataFindAllVersionsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVersionsInput extends WherePaginated(
  WhereDataFindAllVersionsDataInput
) {}
