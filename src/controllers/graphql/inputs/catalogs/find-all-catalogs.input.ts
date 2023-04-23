import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCatalogsDTO,
  WhereDataFindAllCatalogsDTO
} from '@/dtos/catalogs/find-all-catalogs.dto';

@InputType()
class WhereDataFindAllCatalogsDataInput implements WhereDataFindAllCatalogsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  title?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  subtitle?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllCatalogsInput
  implements OrderByDataFindAllCatalogsDTO
{
  @Field(() => OrderBy, { nullable: true })
  title?: OrderBy;

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
export class WhereDataFindAllCatalogsInput extends WherePaginated(
  WhereDataFindAllCatalogsDataInput
) {}
