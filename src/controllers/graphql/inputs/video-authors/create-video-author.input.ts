import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoAuthorInput {
  @Field()
  video: string;

  @Field()
  author: string;
}
