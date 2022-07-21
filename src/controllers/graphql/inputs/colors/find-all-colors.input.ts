import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

import { ColorType } from '@/controllers/graphql/enums/color-type.enum';
import { ThemeMode } from '@/controllers/graphql/enums/theme-mode.enum';
import {
  OrderByDataFindAllColorsDTO,
  WhereDataFindAllColorsDTO
} from '@/dtos/colors/find-all-colors.dto';

@InputType()
class WhereDataFindAllColorsDataInput implements WhereDataFindAllColorsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => ThemeMode, { nullable: true })
  themeMode?: ThemeMode;

  @Field(() => ColorType, { nullable: true })
  type?: ColorType;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllColorsInput
  implements OrderByDataFindAllColorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  themeMode?: OrderBy;

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
export class WhereDataFindAllColorsInput extends WherePaginated(
  WhereDataFindAllColorsDataInput
) {}
