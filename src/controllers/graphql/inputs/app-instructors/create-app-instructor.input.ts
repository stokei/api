import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInstructorInput {
  @Field()
  instructor: string;
}
