import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereProjectInput {
  @Field()
  projectId: string;
}

@InputType()
export class RemoveProjectInput {
  @Field(() => RemoveWhereProjectInput)
  where: RemoveWhereProjectInput;
}
