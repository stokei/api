import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
