import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomModuleInput {
  @Field()
  classroomModuleId: string;
}

@InputType()
export class RemoveClassroomModuleInput {
  @Field(() => RemoveWhereClassroomModuleInput)
  where: RemoveWhereClassroomModuleInput;
}
