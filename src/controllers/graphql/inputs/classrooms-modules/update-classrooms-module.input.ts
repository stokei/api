import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsModuleInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsModuleInput {
  @Field()
  classroomsModuleId: string;
}

@InputType()
export class UpdateClassroomsModuleInput {
  @Field(() => UpdateDataClassroomsModuleInput)
  data: UpdateDataClassroomsModuleInput;

  @Field(() => UpdateWhereClassroomsModuleInput)
  where: UpdateWhereClassroomsModuleInput;
}
