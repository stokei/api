import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDataAccessInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateWhereAccessInput {
  @Field()
  accessId: string;
}

@InputType()
export class UpdateAccessInput {
  @Field(() => UpdateDataAccessInput)
  data: UpdateDataAccessInput;

  @Field(() => UpdateWhereAccessInput)
  where: UpdateWhereAccessInput;
}
