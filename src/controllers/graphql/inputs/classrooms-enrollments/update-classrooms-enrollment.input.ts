import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsEnrollmentInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsEnrollmentInput {
  @Field()
  classroomsEnrollmentId: string;
}

@InputType()
export class UpdateClassroomsEnrollmentInput {
  @Field(() => UpdateDataClassroomsEnrollmentInput)
  data: UpdateDataClassroomsEnrollmentInput;

  @Field(() => UpdateWhereClassroomsEnrollmentInput)
  where: UpdateWhereClassroomsEnrollmentInput;
}
