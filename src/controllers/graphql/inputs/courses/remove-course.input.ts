import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseInput {
  @Field()
  courseId: string;
}

@InputType()
export class RemoveCourseInput {
  @Field(() => RemoveWhereCourseInput)
  where: RemoveWhereCourseInput;
}
