import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideosSubtitleInput {
  @Field()
  videosSubtitleId: string;
}

@InputType()
export class RemoveVideosSubtitleInput {
  @Field(() => RemoveWhereVideosSubtitleInput)
  where: RemoveWhereVideosSubtitleInput;
}
