import { InputType, Field } from '@nestjs/graphql';

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
