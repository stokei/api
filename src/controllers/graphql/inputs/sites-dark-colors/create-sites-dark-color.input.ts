import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSitesDarkColorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
