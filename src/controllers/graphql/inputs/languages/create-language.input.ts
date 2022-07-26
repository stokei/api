import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateLanguageInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  icon?: string;
}
