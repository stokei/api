import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataLanguageInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  icon?: string;
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
