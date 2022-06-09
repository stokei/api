import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideosTagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
