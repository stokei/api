import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataKeywordInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereKeywordInput {
  @Field()
  keywordId: string;
}

@InputType()
export class UpdateKeywordInput {
  @Field(() => UpdateDataKeywordInput)
  data: UpdateDataKeywordInput;

  @Field(() => UpdateWhereKeywordInput)
  where: UpdateWhereKeywordInput;
}
