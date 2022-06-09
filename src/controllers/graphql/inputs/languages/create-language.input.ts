import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLanguageInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
