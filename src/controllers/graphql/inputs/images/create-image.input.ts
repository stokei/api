import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
