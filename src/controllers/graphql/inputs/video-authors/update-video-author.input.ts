import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataVideoAuthorInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereVideoAuthorInput {
  @Field()
  videoAuthorId: string;
}

@InputType()
export class UpdateVideoAuthorInput {
  @Field(() => UpdateDataVideoAuthorInput)
  data: UpdateDataVideoAuthorInput;

  @Field(() => UpdateWhereVideoAuthorInput)
  where: UpdateWhereVideoAuthorInput;
}
