import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomInstructorInput {
  @Field()
  classroom: string;

  @Field()
  instructor: string;
}

@InputType()
export class RemoveClassroomInstructorInput {
  @Field(() => RemoveWhereClassroomInstructorInput)
  where: RemoveWhereClassroomInstructorInput;
}
