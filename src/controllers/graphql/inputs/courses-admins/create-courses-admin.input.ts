import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCoursesAdminInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
