import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereLanguageInput {
  @Field()
  languageId: string;
}

@InputType()
export class RemoveLanguageInput {
  @Field(() => RemoveWhereLanguageInput)
  where: RemoveWhereLanguageInput;
}
