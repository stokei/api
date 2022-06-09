import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
