import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsInstructorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsInstructorInput {
  @Field()
  classroomsInstructorId: string;
}

@InputType()
export class UpdateClassroomsInstructorInput {
  @Field(() => UpdateDataClassroomsInstructorInput)
  data: UpdateDataClassroomsInstructorInput;

  @Field(() => UpdateWhereClassroomsInstructorInput)
  where: UpdateWhereClassroomsInstructorInput;
}
