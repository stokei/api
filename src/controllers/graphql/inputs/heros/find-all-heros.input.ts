import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllHerosDTO,
  WhereDataFindAllHerosDTO
} from '@/dtos/heros/find-all-heros.dto';

@InputType()
class WhereDataFindAllHerosDataInput implements WhereDataFindAllHerosDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  app?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllHerosInput
  implements OrderByDataFindAllHerosDTO
{
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
export class WhereDataFindAllHerosInput extends WherePaginated(
  WhereDataFindAllHerosDataInput
) {}
