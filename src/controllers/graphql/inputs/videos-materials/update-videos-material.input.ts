import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideosMaterialInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideosMaterialInput {
  @Field()
  videosMaterialId: string;
}

@InputType()
export class UpdateVideosMaterialInput {
  @Field(() => UpdateDataVideosMaterialInput)
  data: UpdateDataVideosMaterialInput;

  @Field(() => UpdateWhereVideosMaterialInput)
  where: UpdateWhereVideosMaterialInput;
}
