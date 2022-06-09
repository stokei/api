import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMetatagInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
