import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCoursesAdminInput {
  @Field()
  coursesAdminId: string;
}

@InputType()
export class RemoveCoursesAdminInput {
  @Field(() => RemoveWhereCoursesAdminInput)
  where: RemoveWhereCoursesAdminInput;
}
