import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAnswerInput {
  @Field()
  answerId: string;
}

@InputType()
export class RemoveAnswerInput {
  @Field(() => RemoveWhereAnswerInput)
  where: RemoveWhereAnswerInput;
}
