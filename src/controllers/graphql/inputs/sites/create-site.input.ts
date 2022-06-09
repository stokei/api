import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSiteInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
