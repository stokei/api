import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomInput {
  @Field()
  classroomId: string;
}

@InputType()
export class UpdateClassroomInput {
  @Field(() => UpdateDataClassroomInput)
  data: UpdateDataClassroomInput;

  @Field(() => UpdateWhereClassroomInput)
  where: UpdateWhereClassroomInput;
}
