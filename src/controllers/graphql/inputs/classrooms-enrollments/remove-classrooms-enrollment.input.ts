import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsEnrollmentInput {
  @Field()
  classroomsEnrollmentId: string;
}

@InputType()
export class RemoveClassroomsEnrollmentInput {
  @Field(() => RemoveWhereClassroomsEnrollmentInput)
  where: RemoveWhereClassroomsEnrollmentInput;
}
