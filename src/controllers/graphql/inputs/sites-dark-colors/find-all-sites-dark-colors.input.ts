import {
  OrderByDataFindAllSitesDarkColorsDTO,
  WhereDataFindAllSitesDarkColorsDTO
} from '@/dtos/sites-dark-colors/find-all-sites-dark-colors.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllSitesDarkColorsDataInput
  implements WhereDataFindAllSitesDarkColorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllSitesDarkColorsInput
  implements OrderByDataFindAllSitesDarkColorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllSitesDarkColorsInput extends WherePaginated(
  WhereDataFindAllSitesDarkColorsDataInput
) {}
