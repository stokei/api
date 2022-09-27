import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeactivateWhereClassroomInput {
  @Field()
  classroom: string;
}

@InputType()
export class DeactivateClassroomInput {
  @Field(() => DeactivateWhereClassroomInput)
  where: DeactivateWhereClassroomInput;
}
