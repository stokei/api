import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereLanguageInput {
  @Field()
  language: string;
}

@InputType()
export class RemoveLanguageInput {
  @Field(() => RemoveWhereLanguageInput)
  where: RemoveWhereLanguageInput;
}
