import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field()
  parent: string;

  @Field()
  file: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  poster?: string;
}
