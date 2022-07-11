import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomInstructorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomInstructorInput {
  @Field()
  classroomInstructorId: string;
}

@InputType()
export class UpdateClassroomInstructorInput {
  @Field(() => UpdateDataClassroomInstructorInput)
  data: UpdateDataClassroomInstructorInput;

  @Field(() => UpdateWhereClassroomInstructorInput)
  where: UpdateWhereClassroomInstructorInput;
}
