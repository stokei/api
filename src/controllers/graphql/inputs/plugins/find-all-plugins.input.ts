import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { PluginType } from '@/controllers/graphql/enums/plugin-type.enum';
import {
  OrderByDataFindAllPluginsDTO,
  WhereDataFindAllPluginsDTO
} from '@/dtos/plugins/find-all-plugins.dto';

@InputType()
class WhereDataFindAllPluginsDataInput implements WhereDataFindAllPluginsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => PluginType, { nullable: true })
  type?: PluginType;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPluginsInput
  implements OrderByDataFindAllPluginsDTO
{
  @Field(() => OrderBy, { nullable: true })
  type?: OrderBy;

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
export class WhereDataFindAllPluginsInput extends WherePaginated(
  WhereDataFindAllPluginsDataInput
) {}
