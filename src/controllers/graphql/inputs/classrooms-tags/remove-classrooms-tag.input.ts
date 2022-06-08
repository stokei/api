import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsTagInput {
  @Field()
  classroomsTagId: string;
}

@InputType()
export class RemoveClassroomsTagInput {
  @Field(() => RemoveWhereClassroomsTagInput)
  where: RemoveWhereClassroomsTagInput;
}
