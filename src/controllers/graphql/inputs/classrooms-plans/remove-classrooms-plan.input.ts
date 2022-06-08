import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RemoveWhereClassroomsPlanInput {
  @Field()
  classroomsPlanId: string;
}

@InputType()
export class RemoveClassroomsPlanInput {
  @Field(() => RemoveWhereClassroomsPlanInput)
  where: RemoveWhereClassroomsPlanInput;
}
