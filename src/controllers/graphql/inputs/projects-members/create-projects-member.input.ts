import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectsMemberInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
