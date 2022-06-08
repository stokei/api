import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideosSubtitleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
