import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomModuleInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomModuleInput {
  @Field()
  classroomModuleId: string;
}

@InputType()
export class UpdateClassroomModuleInput {
  @Field(() => UpdateDataClassroomModuleInput)
  data: UpdateDataClassroomModuleInput;

  @Field(() => UpdateWhereClassroomModuleInput)
  where: UpdateWhereClassroomModuleInput;
}
