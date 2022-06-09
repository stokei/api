import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCoursesAdminInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
