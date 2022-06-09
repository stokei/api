import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsInstructorInput {
  @Field()
  classroomsInstructorId: string;
}

@InputType()
export class RemoveClassroomsInstructorInput {
  @Field(() => RemoveWhereClassroomsInstructorInput)
  where: RemoveWhereClassroomsInstructorInput;
}
