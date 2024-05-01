import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PublishVersionInput {
  @Field(() => String)
  version: string;
}
