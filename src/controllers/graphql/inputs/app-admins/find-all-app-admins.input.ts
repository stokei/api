import { Field, InputType } from '@nestjs/graphql';
import { OrderBy, WhereDataStringInput, WherePaginated } from '@stokei/nestjs';

import {
  OrderByDataFindAllAppAdminsDTO,
  WhereDataFindAllAppAdminsDTO
} from '@/dtos/app-admins/find-all-app-admins.dto';

@InputType()
class WhereDataFindAllAppAdminsDataInput
  implements WhereDataFindAllAppAdminsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  app?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  admin?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllAppAdminsInput
  implements OrderByDataFindAllAppAdminsDTO
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
export class WhereDataFindAllAppAdminsInput extends WherePaginated(
  WhereDataFindAllAppAdminsDataInput
) {}
