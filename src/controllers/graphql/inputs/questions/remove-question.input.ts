import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereQuestionInput {
  @Field()
  questionId: string;
}

@InputType()
export class RemoveQuestionInput {
  @Field(() => RemoveWhereQuestionInput)
  where: RemoveWhereQuestionInput;
}
