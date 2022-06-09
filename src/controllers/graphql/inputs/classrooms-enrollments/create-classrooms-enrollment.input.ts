import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsEnrollmentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
