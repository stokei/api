import {
  OrderByDataFindAllModulesMaterialsDTO,
  WhereDataFindAllModulesMaterialsDTO
} from '@/dtos/modules-materials/find-all-modules-materials.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllModulesMaterialsDataInput
  implements WhereDataFindAllModulesMaterialsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllModulesMaterialsInput
  implements OrderByDataFindAllModulesMaterialsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllModulesMaterialsInput extends WherePaginated(
  WhereDataFindAllModulesMaterialsDataInput
) {}
