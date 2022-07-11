import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoAuthorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
