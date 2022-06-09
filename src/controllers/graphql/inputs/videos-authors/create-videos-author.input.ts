import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideosAuthorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
