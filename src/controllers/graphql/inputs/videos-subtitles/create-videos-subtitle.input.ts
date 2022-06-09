import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideosSubtitleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
