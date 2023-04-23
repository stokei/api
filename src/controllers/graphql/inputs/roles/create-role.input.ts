import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
