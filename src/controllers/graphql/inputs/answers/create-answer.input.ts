import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
