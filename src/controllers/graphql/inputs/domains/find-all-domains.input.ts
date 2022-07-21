import { Field, InputType } from '@nestjs/graphql';
import {
  OrderBy,
  WhereDataBooleanInput,
  WhereDataSearchInput,
  WhereDataStringInput,
  WherePaginated
} from '@stokei/nestjs';

import { DomainStatus } from '@/controllers/graphql/enums/domain-status.enum';
import {
  OrderByDataFindAllDomainsDTO,
  WhereDataFindAllDomainsDTO
} from '@/dtos/domains/find-all-domains.dto';

@InputType()
class WhereDataFindAllDomainsDataInput implements WhereDataFindAllDomainsDTO {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => WhereDataStringInput, { nullable: true })
  parent?: WhereDataStringInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  name?: WhereDataSearchInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  default?: WhereDataBooleanInput;

  @Field(() => WhereDataBooleanInput, { nullable: true })
  active?: WhereDataBooleanInput;

  @Field(() => WhereDataSearchInput, { nullable: true })
  fulldomain?: WhereDataSearchInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  extension?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  language?: WhereDataStringInput;

  @Field(() => DomainStatus, { nullable: true })
  status?: DomainStatus;

  @Field(() => WhereDataStringInput, { nullable: true })
  updatedBy?: WhereDataStringInput;

  @Field(() => WhereDataStringInput, { nullable: true })
  createdBy?: WhereDataStringInput;
}

@InputType()
export class OrderByDataFindAllDomainsInput
  implements OrderByDataFindAllDomainsDTO
{
  @Field(() => OrderBy, { nullable: true })
  name?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  default?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  active?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  fulldomain?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  extension?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  language?: OrderBy;

  @Field(() => OrderBy, { nullable: true })
  status?: OrderBy;

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
export class WhereDataFindAllDomainsInput extends WherePaginated(
  WhereDataFindAllDomainsDataInput
) {}
