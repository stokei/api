import {
  OrderByDataFindAllModulesVideosDTO,
  WhereDataFindAllModulesVideosDTO
} from '@/dtos/modules-videos/find-all-modules-videos.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllModulesVideosDataInput
  implements WhereDataFindAllModulesVideosDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllModulesVideosInput
  implements OrderByDataFindAllModulesVideosDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllModulesVideosInput extends WherePaginated(
  WhereDataFindAllModulesVideosDataInput
) {}
