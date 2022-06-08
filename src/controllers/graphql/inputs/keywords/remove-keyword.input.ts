import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereKeywordInput {
  @Field()
  keywordId: string;
}

@InputType()
export class RemoveKeywordInput {
  @Field(() => RemoveWhereKeywordInput)
  where: RemoveWhereKeywordInput;
}
