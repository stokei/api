import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataCourseInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereCourseInput {
  @Field()
  courseId: string;
}

@InputType()
export class UpdateCourseInput {
  @Field(() => UpdateDataCourseInput)
  data: UpdateDataCourseInput;

  @Field(() => UpdateWhereCourseInput)
  where: UpdateWhereCourseInput;
}
