import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAppInstructorInput {
  @Field()
  app: string;

  @Field()
  instructor: string;
}

@InputType()
export class RemoveAppInstructorInput {
  @Field(() => RemoveWhereAppInstructorInput)
  where: RemoveWhereAppInstructorInput;
}
