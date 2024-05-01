import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSiteInput {
  @Field(() => String)
  parent: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;
}
