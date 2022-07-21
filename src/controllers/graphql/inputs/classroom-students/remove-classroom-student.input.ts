import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomStudentInput {
  @Field()
  classroom: string;

  @Field()
  student: string;
}

@InputType()
export class RemoveClassroomStudentInput {
  @Field(() => RemoveWhereClassroomStudentInput)
  where: RemoveWhereClassroomStudentInput;
}
