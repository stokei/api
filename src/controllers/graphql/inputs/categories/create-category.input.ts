import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
