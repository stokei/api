import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDataProjectInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereProjectInput {
  @Field()
  projectId: string;
}

@InputType()
export class UpdateProjectInput {
  @Field(() => UpdateDataProjectInput)
  data: UpdateDataProjectInput;

  @Field(() => UpdateWhereProjectInput)
  where: UpdateWhereProjectInput;
}
