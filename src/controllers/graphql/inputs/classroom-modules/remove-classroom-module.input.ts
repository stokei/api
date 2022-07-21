import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomModuleInput {
  @Field()
  classroom: string;

  @Field()
  module: string;
}

@InputType()
export class RemoveClassroomModuleInput {
  @Field(() => RemoveWhereClassroomModuleInput)
  where: RemoveWhereClassroomModuleInput;
}
