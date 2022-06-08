import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereVideosAuthorInput {
  @Field()
  videosAuthorId: string;
}

@InputType()
export class RemoveVideosAuthorInput {
  @Field(() => RemoveWhereVideosAuthorInput)
  where: RemoveWhereVideosAuthorInput;
}
