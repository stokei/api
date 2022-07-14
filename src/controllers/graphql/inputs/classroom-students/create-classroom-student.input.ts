import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomStudentInput {
  @Field()
  classroom: string;

  @Field()
  student: string;
}
