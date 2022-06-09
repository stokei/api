import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import {
  OrderByDataFindAllQuestionsDTO,
  WhereDataFindAllQuestionsDTO
} from '@/dtos/questions/find-all-questions.dto';

@InputType()
class WhereDataFindAllQuestionsDataInput
  implements WhereDataFindAllQuestionsDTO
{
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  name?: WhereDataSearchInput;
}

@InputType()
export class OrderByDataFindAllQuestionsInput
  implements OrderByDataFindAllQuestionsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllQuestionsInput extends WherePaginated(
  WhereDataFindAllQuestionsDataInput
) {}
