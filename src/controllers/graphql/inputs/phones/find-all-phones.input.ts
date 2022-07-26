import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { PhoneStatus } from '@/controllers/graphql/enums/phone-status.enum';
import {
  OrderByDataFindAllPhonesDTO,
  WhereDataFindAllPhonesDTO
} from '@/dtos/phones/find-all-phones.dto';

@InputType()
class WhereDataFindAllPhonesDataInput implements WhereDataFindAllPhonesDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  countryCode?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  areaCode?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  number?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  validationCode?: WhereDataStringInput;

  @Field(() => PhoneStatus, { nullable: true })
  status?: PhoneStatus;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  default?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllPhonesInput
  implements OrderByDataFindAllPhonesDTO
{
  @Field(() => OrderBy, { nullable: true })
  fullnumber?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  countryCode?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  areaCode?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  number?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  default?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

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
export class WhereDataFindAllPhonesInput extends WherePaginated(
  WhereDataFindAllPhonesDataInput
) {}
