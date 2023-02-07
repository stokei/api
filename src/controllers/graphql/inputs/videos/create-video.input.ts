import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  file?: string;

  @Field({ nullable: true })
  poster?: string;

  @Field(() => Boolean, { nullable: true })
  private?: boolean;
}
