import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideosTagInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideosTagInput {
  @Field()
  videosTagId: string;
}

@InputType()
export class UpdateVideosTagInput {
  @Field(() => UpdateDataVideosTagInput)
  data: UpdateDataVideosTagInput;

  @Field(() => UpdateWhereVideosTagInput)
  where: UpdateWhereVideosTagInput;
}
