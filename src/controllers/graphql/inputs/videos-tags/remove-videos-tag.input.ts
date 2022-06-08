import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideosTagInput {
  @Field()
  videosTagId: string;
}

@InputType()
export class RemoveVideosTagInput {
  @Field(() => RemoveWhereVideosTagInput)
  where: RemoveWhereVideosTagInput;
}
