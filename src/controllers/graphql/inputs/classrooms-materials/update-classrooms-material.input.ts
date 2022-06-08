import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsMaterialInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsMaterialInput {
  @Field()
  classroomsMaterialId: string;
}

@InputType()
export class UpdateClassroomsMaterialInput {
  @Field(() => UpdateDataClassroomsMaterialInput)
  data: UpdateDataClassroomsMaterialInput;

  @Field(() => UpdateWhereClassroomsMaterialInput)
  where: UpdateWhereClassroomsMaterialInput;
}
