import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAppAdminInput {
  @Field()
  admin: string;
}
