import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsAdminInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsAdminInput {
  @Field()
  classroomsAdminId: string;
}

@InputType()
export class UpdateClassroomsAdminInput {
  @Field(() => UpdateDataClassroomsAdminInput)
  data: UpdateDataClassroomsAdminInput;

  @Field(() => UpdateWhereClassroomsAdminInput)
  where: UpdateWhereClassroomsAdminInput;
}
