import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomStudentInput {
  @Field()
  classroomStudentId: string;
}

@InputType()
export class RemoveClassroomStudentInput {
  @Field(() => RemoveWhereClassroomStudentInput)
  where: RemoveWhereClassroomStudentInput;
}
