import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAnswerInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereAnswerInput {
  @Field()
  answerId: string;
}

@InputType()
export class UpdateAnswerInput {
  @Field(() => UpdateDataAnswerInput)
  data: UpdateDataAnswerInput;

  @Field(() => UpdateWhereAnswerInput)
  where: UpdateWhereAnswerInput;
}
