import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsAdminInput {
  @Field()
  classroomsAdminId: string;
}

@InputType()
export class RemoveClassroomsAdminInput {
  @Field(() => RemoveWhereClassroomsAdminInput)
  where: RemoveWhereClassroomsAdminInput;
}
