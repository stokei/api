import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllPhonesDTO,
  WhereDataFindAllPhonesDTO
} from '@/dtos/phones/find-all-phones.dto';

@InputType()
class WhereDataFindAllPhonesDataInput implements WhereDataFindAllPhonesDTO {
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
export class OrderByDataFindAllPhonesInput
  implements OrderByDataFindAllPhonesDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllPhonesInput extends WherePaginated(
  WhereDataFindAllPhonesDataInput
) {}
