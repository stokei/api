import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppAdminInput {
  @Field()
  app: string;

  @Field()
  admin: string;
}
