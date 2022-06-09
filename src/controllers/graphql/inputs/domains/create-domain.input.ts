import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDomainInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
