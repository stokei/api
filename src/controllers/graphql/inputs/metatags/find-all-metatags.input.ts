import {
  OrderByDataFindAllMetatagsDTO,
  WhereDataFindAllMetatagsDTO
} from '@/dtos/metatags/find-all-metatags.dto';
import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataStringInput,
  WhereDataSearchInput,
  WherePaginated
} from '@stokei/nestjs';

@InputType()
class WhereDataFindAllMetatagsDataInput implements WhereDataFindAllMetatagsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllMetatagsInput
  implements OrderByDataFindAllMetatagsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllMetatagsInput extends WherePaginated(
  WhereDataFindAllMetatagsDataInput
) {}
