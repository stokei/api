import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomInput {
  @Field()
  classroomId: string;
}

@InputType()
export class RemoveClassroomInput {
  @Field(() => RemoveWhereClassroomInput)
  where: RemoveWhereClassroomInput;
}
