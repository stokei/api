import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsModuleInput {
  @Field()
  classroomsModuleId: string;
}

@InputType()
export class RemoveClassroomsModuleInput {
  @Field(() => RemoveWhereClassroomsModuleInput)
  where: RemoveWhereClassroomsModuleInput;
}
