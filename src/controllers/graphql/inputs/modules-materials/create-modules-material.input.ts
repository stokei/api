import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateModulesMaterialInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
