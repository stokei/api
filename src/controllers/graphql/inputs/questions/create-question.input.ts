import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
