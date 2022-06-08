import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCoursesAdminInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCoursesAdminInput {
  @Field()
  coursesAdminId: string;
}

@InputType()
export class UpdateCoursesAdminInput {
  @Field(() => UpdateDataCoursesAdminInput)
  data: UpdateDataCoursesAdminInput;

  @Field(() => UpdateWhereCoursesAdminInput)
  where: UpdateWhereCoursesAdminInput;
}
