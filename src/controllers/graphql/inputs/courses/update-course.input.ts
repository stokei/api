import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataCourseInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  avatar?: string;
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
