import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomInstructorInput {
  @Field()
  classroomInstructorId: string;
}

@InputType()
export class RemoveClassroomInstructorInput {
  @Field(() => RemoveWhereClassroomInstructorInput)
  where: RemoveWhereClassroomInstructorInput;
}
