import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFeatureInput {
  @Field()
  parent: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
