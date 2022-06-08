import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideosTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
