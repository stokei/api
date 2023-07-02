import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoViewInput {
  @Field()
  video: string;
}
