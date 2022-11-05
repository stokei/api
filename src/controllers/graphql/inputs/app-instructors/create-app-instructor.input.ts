import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppInstructorInput {
  @Field()
  app: string;

  @Field()
  instructor: string;
}
