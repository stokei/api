import {
  OrderByDataFindAllSitesLightColorsDTO,
  WhereDataFindAllSitesLightColorsDTO
} from '@/dtos/sites-light-colors/find-all-sites-light-colors.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllSitesLightColorsDataInput
  implements WhereDataFindAllSitesLightColorsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllSitesLightColorsInput
  implements OrderByDataFindAllSitesLightColorsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllSitesLightColorsInput extends WherePaginated(
  WhereDataFindAllSitesLightColorsDataInput
) {}
