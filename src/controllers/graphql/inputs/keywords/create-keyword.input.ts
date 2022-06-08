import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateKeywordInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
