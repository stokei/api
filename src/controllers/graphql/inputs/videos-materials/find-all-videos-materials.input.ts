import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosMaterialsDTO,
  WhereDataFindAllVideosMaterialsDTO
} from '@/dtos/videos-materials/find-all-videos-materials.dto';

@InputType()
class WhereDataFindAllVideosMaterialsDataInput
  implements WhereDataFindAllVideosMaterialsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllVideosMaterialsInput
  implements OrderByDataFindAllVideosMaterialsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllVideosMaterialsInput extends WherePaginated(
  WhereDataFindAllVideosMaterialsDataInput
) {}
