import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereDomainInput {
  @Field()
  domainId: string;
}

@InputType()
export class RemoveDomainInput {
  @Field(() => RemoveWhereDomainInput)
  where: RemoveWhereDomainInput;
}
