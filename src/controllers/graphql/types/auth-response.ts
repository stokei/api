import { Field, ObjectType } from '@nestjs/graphql';
import { MeAccount } from './me-account';

@ObjectType()
export class AuthResponse implements AuthResponse {
  @Field(() => MeAccount)
  account: MeAccount;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
