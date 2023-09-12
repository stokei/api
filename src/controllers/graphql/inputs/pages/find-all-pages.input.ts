import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPagesDTO,
  WhereDataFindAllPagesDTO
} from '@/dtos/pages/find-all-pages.dto';

@InputType()
class WhereDataFindAllPagesDataInput implements WhereDataFindAllPagesDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  title?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  slug?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPagesInput
  implements OrderByDataFindAllPagesDTO
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
export class WhereDataFindAllPagesInput extends WherePaginated(
  WhereDataFindAllPagesDataInput
) {}
