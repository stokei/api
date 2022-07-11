import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCourseStudentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCourseStudentInput {
  @Field()
  courseStudentId: string;
}

@InputType()
export class UpdateCourseStudentInput {
  @Field(() => UpdateDataCourseStudentInput)
  data: UpdateDataCourseStudentInput;

  @Field(() => UpdateWhereCourseStudentInput)
  where: UpdateWhereCourseStudentInput;
}
