import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDomainInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field()
  language: string;
}
