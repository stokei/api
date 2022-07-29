import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereDomainInput {
  @Field()
  domain: string;
}

@InputType()
export class RemoveDomainInput {
  @Field(() => RemoveWhereDomainInput)
  where: RemoveWhereDomainInput;
}
