import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomStudentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomStudentInput {
  @Field()
  classroomStudentId: string;
}

@InputType()
export class UpdateClassroomStudentInput {
  @Field(() => UpdateDataClassroomStudentInput)
  data: UpdateDataClassroomStudentInput;

  @Field(() => UpdateWhereClassroomStudentInput)
  where: UpdateWhereClassroomStudentInput;
}
