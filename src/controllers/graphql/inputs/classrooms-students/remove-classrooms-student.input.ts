import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsStudentInput {
  @Field()
  classroomsStudentId: string;
}

@InputType()
export class RemoveClassroomsStudentInput {
  @Field(() => RemoveWhereClassroomsStudentInput)
  where: RemoveWhereClassroomsStudentInput;
}
