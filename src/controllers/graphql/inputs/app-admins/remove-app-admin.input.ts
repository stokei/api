import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWhereAppAdminInput {
  @Field()
  app: string;

  @Field()
  admin: string;
}

@InputType()
export class RemoveAppAdminInput {
  @Field(() => RemoveWhereAppAdminInput)
  where: RemoveWhereAppAdminInput;
}
