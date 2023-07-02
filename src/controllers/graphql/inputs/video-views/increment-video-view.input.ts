import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class IncrementVideoViewInput {
  @Field()
  videoView: string;
}
