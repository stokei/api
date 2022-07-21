import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
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
