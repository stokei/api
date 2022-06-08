import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataProjectsPlanInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProjectsPlanInput {
  @Field()
  projectsPlanId: string;
}

@InputType()
export class UpdateProjectsPlanInput {
  @Field(() => UpdateDataProjectsPlanInput)
  data: UpdateDataProjectsPlanInput;

  @Field(() => UpdateWhereProjectsPlanInput)
  where: UpdateWhereProjectsPlanInput;
}
