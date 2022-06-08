import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideosAuthorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
