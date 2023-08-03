import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PixCheckout {
  @Field(() => String)
  qrCodeURL: string;
}
