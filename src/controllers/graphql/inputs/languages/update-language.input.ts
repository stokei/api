import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataLanguageInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereLanguageInput {
  @Field()
  languageId: string;
}

@InputType()
export class UpdateLanguageInput {
  @Field(() => UpdateDataLanguageInput)
  data: UpdateDataLanguageInput;

  @Field(() => UpdateWhereLanguageInput)
  where: UpdateWhereLanguageInput;
}
