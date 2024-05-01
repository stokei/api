import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { ComponentType } from '@/controllers/graphql/enums/component-type.enum';
import {
  OrderByDataFindAllComponentsDTO,
  WhereDataFindAllComponentsDTO
} from '@/dtos/components/find-all-components.dto';

@InputType()
class WhereDataFindAllComponentsDataInput
  implements WhereDataFindAllComponentsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataSearchInput, { nullable: true })
  parent?: WhereDataSearchInput;

  @Field(() => ComponentType, { nullable: true })
  type?: ComponentType;

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllComponentsInput
  implements OrderByDataFindAllComponentsDTO
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
export class WhereDataFindAllComponentsInput extends WherePaginated(
  WhereDataFindAllComponentsDataInput
) {}
