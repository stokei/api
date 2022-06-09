import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllCoursesAdminsDTO,
  WhereDataFindAllCoursesAdminsDTO
} from '@/dtos/courses-admins/find-all-courses-admins.dto';

@InputType()
class WhereDataFindAllCoursesAdminsDataInput
  implements WhereDataFindAllCoursesAdminsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllCoursesAdminsInput
  implements OrderByDataFindAllCoursesAdminsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllCoursesAdminsInput extends WherePaginated(
  WhereDataFindAllCoursesAdminsDataInput
) {}
