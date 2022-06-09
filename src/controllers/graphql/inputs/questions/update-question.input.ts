import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataQuestionInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereQuestionInput {
  @Field()
  questionId: string;
}

@InputType()
export class UpdateQuestionInput {
  @Field(() => UpdateDataQuestionInput)
  data: UpdateDataQuestionInput;

  @Field(() => UpdateWhereQuestionInput)
  where: UpdateWhereQuestionInput;
}
