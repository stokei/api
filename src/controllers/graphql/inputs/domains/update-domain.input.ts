import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataDomainInput {
  @Field()
  name: string;
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
