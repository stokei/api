import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsMaterialInput {
  @Field()
  classroomsMaterialId: string;
}

@InputType()
export class RemoveClassroomsMaterialInput {
  @Field(() => RemoveWhereClassroomsMaterialInput)
  where: RemoveWhereClassroomsMaterialInput;
}
