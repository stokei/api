import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCoursesStudentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCoursesStudentInput {
  @Field()
  coursesStudentId: string;
}

@InputType()
export class UpdateCoursesStudentInput {
  @Field(() => UpdateDataCoursesStudentInput)
  data: UpdateDataCoursesStudentInput;

  @Field(() => UpdateWhereCoursesStudentInput)
  where: UpdateWhereCoursesStudentInput;
}
