import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
