import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataClassroomsPlanInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereClassroomsPlanInput {
  @Field()
  classroomsPlanId: string;
}

@InputType()
export class UpdateClassroomsPlanInput {
  @Field(() => UpdateDataClassroomsPlanInput)
  data: UpdateDataClassroomsPlanInput;

  @Field(() => UpdateWhereClassroomsPlanInput)
  where: UpdateWhereClassroomsPlanInput;
}
