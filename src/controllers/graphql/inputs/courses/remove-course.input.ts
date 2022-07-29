import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereCourseInput {
  @Field()
  course: string;

  @Field()
  parent: string;
}

@InputType()
export class RemoveCourseInput {
  @Field(() => RemoveWhereCourseInput)
  where: RemoveWhereCourseInput;
}
