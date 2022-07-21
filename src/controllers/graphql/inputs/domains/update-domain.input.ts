import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataDomainInput {
  @Field(() => Boolean)
  default?: boolean;
}

@InputType()
export class UpdateWhereDomainInput {
  @Field()
  domainId: string;
}

@InputType()
export class UpdateDomainInput {
  @Field(() => UpdateDataDomainInput)
  data: UpdateDataDomainInput;

  @Field(() => UpdateWhereDomainInput)
  where: UpdateWhereDomainInput;
}
