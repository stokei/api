import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
