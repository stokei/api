import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsStudentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsStudentInput {
  @Field()
  classroomsStudentId: string;
}

@InputType()
export class UpdateClassroomsStudentInput {
  @Field(() => UpdateDataClassroomsStudentInput)
  data: UpdateDataClassroomsStudentInput;

  @Field(() => UpdateWhereClassroomsStudentInput)
  where: UpdateWhereClassroomsStudentInput;
}
