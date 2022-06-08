import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsTagInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsTagInput {
  @Field()
  classroomsTagId: string;
}

@InputType()
export class UpdateClassroomsTagInput {
  @Field(() => UpdateDataClassroomsTagInput)
  data: UpdateDataClassroomsTagInput;

  @Field(() => UpdateWhereClassroomsTagInput)
  where: UpdateWhereClassroomsTagInput;
}
