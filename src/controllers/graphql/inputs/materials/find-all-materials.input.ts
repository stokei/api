import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllMaterialsDTO,
  WhereDataFindAllMaterialsDTO
} from '@/dtos/materials/find-all-materials.dto';

@InputType()
class WhereDataFindAllMaterialsDataInput
  implements WhereDataFindAllMaterialsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  free?: WhereDataBooleanInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  description?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllMaterialsInput
  implements OrderByDataFindAllMaterialsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  free?: OrderBy;

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
export class WhereDataFindAllMaterialsInput extends WherePaginated(
  WhereDataFindAllMaterialsDataInput
) {}
