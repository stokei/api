import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { AccountRole } from '@/controllers/graphql/enums/account-role.enum';
import {
  OrderByDataFindAllAccountsDTO,
  WhereDataFindAllAccountsDTO
} from '@/dtos/accounts/find-all-accounts.dto';

@InputType()
class WhereDataFindAllAccountsDataInput implements WhereDataFindAllAccountsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  parent?: WhereDataStringInput;

  @Field({ nullable: true })
  firstname?: WhereDataSearchInput;

  @Field({ nullable: true })
  lastname?: WhereDataSearchInput;

  @Field({ nullable: true })
  email?: WhereDataStringInput;

  @Field({ nullable: true })
  username?: WhereDataStringInput;

  @Field(() => [AccountRole], { nullable: true })
  roles?: AccountRole[];

  @Field({ nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field({ nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllAccountsInput
  implements OrderByDataFindAllAccountsDTO
{
  @Field(() => OrderBy, { nullable: true })
  firstname?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  lastname?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  email?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  username?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  canceledAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  createdAt?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  updatedAt?: OrderBy;
}

@InputType()
export class WhereDataFindAllAccountsInput extends WherePaginated(
  WhereDataFindAllAccountsDataInput
) {}
