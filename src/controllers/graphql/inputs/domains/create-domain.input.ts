import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDomainInput {
  @Field()
  parent: string;

  @Field()
  fulldomain: string;

  @Field(() => Boolean, { nullable: true })
  default?: boolean;

  @Field()
  language: string;
}
