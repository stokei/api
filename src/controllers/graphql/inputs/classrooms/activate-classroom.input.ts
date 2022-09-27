import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ActivateWhereClassroomInput {
  @Field()
  classroom: string;
}

@InputType()
export class ActivateClassroomInput {
  @Field(() => ActivateWhereClassroomInput)
  where: ActivateWhereClassroomInput;
}
