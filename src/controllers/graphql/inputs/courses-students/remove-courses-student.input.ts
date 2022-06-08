import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCoursesStudentInput {
  @Field()
  coursesStudentId: string;
}

@InputType()
export class RemoveCoursesStudentInput {
  @Field(() => RemoveWhereCoursesStudentInput)
  where: RemoveWhereCoursesStudentInput;
}
