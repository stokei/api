import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideosAuthorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideosAuthorInput {
  @Field()
  videosAuthorId: string;
}

@InputType()
export class UpdateVideosAuthorInput {
  @Field(() => UpdateDataVideosAuthorInput)
  data: UpdateDataVideosAuthorInput;

  @Field(() => UpdateWhereVideosAuthorInput)
  where: UpdateWhereVideosAuthorInput;
}
