import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSitesLightColorInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
