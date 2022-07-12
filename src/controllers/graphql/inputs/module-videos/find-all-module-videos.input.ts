import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllModuleVideosDTO,
  WhereDataFindAllModuleVideosDTO
} from '@/dtos/module-videos/find-all-module-videos.dto';

@InputType()
class WhereDataFindAllModuleVideosDataInput
  implements WhereDataFindAllModuleVideosDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllModuleVideosInput
  implements OrderByDataFindAllModuleVideosDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllModuleVideosInput extends WherePaginated(
  WhereDataFindAllModuleVideosDataInput
) {}
