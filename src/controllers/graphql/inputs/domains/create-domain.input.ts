import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDomainInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
