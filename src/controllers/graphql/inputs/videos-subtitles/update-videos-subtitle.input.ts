import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideosSubtitleInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideosSubtitleInput {
  @Field()
  videosSubtitleId: string;
}

@InputType()
export class UpdateVideosSubtitleInput {
  @Field(() => UpdateDataVideosSubtitleInput)
  data: UpdateDataVideosSubtitleInput;

  @Field(() => UpdateWhereVideosSubtitleInput)
  where: UpdateWhereVideosSubtitleInput;
}
