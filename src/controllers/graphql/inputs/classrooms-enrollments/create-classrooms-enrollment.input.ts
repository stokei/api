import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomsEnrollmentInput {
  @Field()
  parent: string;

  @Field()
  name: string;
}
